"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import postgres from "postgres";
import { hashSync } from "bcrypt-ts";
import { unstable_noStore as noStore } from "next/cache";
import { Users } from "./definitions";

export type UserState = {
    errors?: {
        firstName?: string[];
        lastName?: string[];
        email?: string[];
        password?: string[];
        status?: string[];
    };
    message?: string | null;
};

const UserSchema = z.object({
    firstName: z.string().min(1, { message: "Must have at least 1 character" }),
    lastName: z.string().min(1, { message: "Must have at least 1 character" }),
    email: z.string().email({
        message: "Must be a valid email address",
    }),
    password: z.string().min(8, { message: "Must have at least 8 character" }),
    status: z.enum(["active", "inactive"], {
        invalid_type_error: "Please select an user status",
    }),
});
const CreateUser = UserSchema;

const UpdateUser = UserSchema.omit({ email: true }).extend({
    password: z
        .string()
        .min(8, { message: "Must have at least 8 character" })
        .optional(),
});

const ITEMS_PER_PAGE = 6;
export async function fetchFilteredUsers(query: string, currentPage: number) {
    noStore();
    const offset = (currentPage - 1) * ITEMS_PER_PAGE;

    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        const users = await client`
            SELECT
                id,
                email,
                status,
                created_at,
                first_name,
                last_name
            FROM gkc_users
            WHERE
                (first_name ILIKE ${`%${query}%`} OR
                last_name ILIKE ${`%${query}%`}) AND
                deleted_at IS NULL
            ORDER BY created_at DESC
            LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
        `;
        client.end();
        return users;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch users.");
    }
}

export async function fetchUsersPages(query: string) {
    noStore();
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);

        const count = await client`
            SELECT COUNT(*)
            FROM gkc_users
            WHERE
                (first_name ILIKE ${`%${query}%`} OR
                last_name ILIKE ${`%${query}%`}) AND
                deleted_at IS NULL
        `;
        client.end();
        const totalPages = Math.ceil(Number(count[0]?.count) / ITEMS_PER_PAGE);
        return totalPages;
    } catch (error) {
        console.error("Database Error:", error);
        throw new Error("Failed to fetch total number of users.");
    }
}

export async function fetchUserById(id: number) {
    noStore();
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        const data = await client`
            SELECT
                id,
                email,
                status,
                created_at,
                first_name,
                last_name
            FROM gkc_users
            WHERE id = ${id};
        `;
        client.end();
        return data?.[0] as Users | undefined;
    } catch (error) {
        console.error("Database Error:", error);
    }
}

export async function createUser(prevState: UserState, formData: FormData) {
    // Validate form fields using Zod
    const validatedFields = CreateUser.safeParse({
        firstName: formData.get("first_name"),
        lastName: formData.get("last_name"),
        email: formData.get("email"),
        password: formData.get("password"),
        status: formData.get("status"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Add User.",
        };
    }

    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        const result =
            await client`SELECT * FROM gkc_users WHERE email = ${validatedFields.data.email}`;
        client.end();
        if (result?.length > 0) {
            return {
                message: "Email already exists.",
            };
        }
    } catch (error) {
        return {
            message: "Database Error: Failed to Add User.",
        };
    }
    const { email, password, firstName, lastName, status } =
        validatedFields.data;
    const hashedPassword = hashSync(password, 10);

    const date = new Date();
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        await client`INSERT INTO gkc_users (email, password, status, created_at, updated_at, first_name, last_name) VALUES (${email}, ${hashedPassword}, ${status}, ${date}, ${date}, ${firstName}, ${lastName})`;
        client.end();
    } catch (error) {
        return {
            message: "Database Error: Failed to Add User.",
        };
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}

export async function updateUser(
    id: number,
    prevState: UserState,
    formData: FormData
) {
    // Validate form fields using Zod
    const validatedFields = UpdateUser.safeParse({
        status: formData.get("status"),
        firstName: formData.get("first_name"),
        lastName: formData.get("last_name"),
        password: formData.get("password"),
    });

    // If form validation fails, return errors early. Otherwise, continue.
    if (!validatedFields.success) {
        return {
            errors: validatedFields.error.flatten().fieldErrors,
            message: "Missing Fields. Failed to Update User.",
        };
    }

    // Prepare data for insertion into the database
    const { status, firstName, lastName, password } = validatedFields.data;
    try {
        let hashedPassword;
        let query = `status = ${status}, updated_at = ${new Date()}, first_name = ${firstName}, last_name = ${lastName}`;
        if (password) {
            hashedPassword = hashSync(password, 10);
            query = query + `, password = ${hashedPassword}`;
        }
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        await client`
            UPDATE gkc_users
            SET ${query}
            WHERE id = ${id}
        `;
        client.end();
    } catch (error) {
        console.log("Database Error:", error);
        return { message: "Database Error: Failed to Update User." };
    }
    revalidatePath("/dashboard/users");
    redirect("/dashboard/users");
}

export async function deleteUser(id: number) {
    let date = new Date();
    try {
        let client = postgres(`${process.env.POSTGRES_URL!}`);
        await client`UPDATE gkc_users SET deleted_at = ${date}, status='inactive' where id = ${id}`;
        client.end();
        revalidatePath("/dashboard/users");
    } catch (error) {
        return { message: "Database Error: Failed to Delete User." };
    }
}

export async function authenticate(
    prevState: string | undefined,
    formData: any
) {
    try {
        await signIn("credentials", {
            email: formData.get("email") as string,
            password: formData.get("password") as string,
        });
    } catch (error) {
        if ((error as Error).message.includes("CredentialsSignin")) {
            return "CredentialSignin";
        }
        throw error;
    }
}
