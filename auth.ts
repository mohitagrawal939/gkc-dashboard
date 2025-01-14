import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { z } from "zod";
import { compare } from "bcrypt-ts";
import Credentials from "next-auth/providers/credentials";
import { getUserFromDB } from "./authDB";

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [
        Credentials({
            async authorize(credentials) {
                const parsedCredentials = z
                    .object({
                        email: z.string().email(),
                        password: z.string().min(8),
                    })
                    .safeParse(credentials);
                if (parsedCredentials.success) {
                    const { email, password } = parsedCredentials.data;
                    const user = await getUserFromDB(email);
                    if (!user) return null;
                    const passwordsMatch = await compare(
                        password,
                        user.password
                    );
                    if (passwordsMatch) return user;
                }
                console.log("Invalid credentials");
                return null;
            },
        }),
    ],
});
