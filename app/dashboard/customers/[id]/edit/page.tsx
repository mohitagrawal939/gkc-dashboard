import Form from "@/app/ui/users/edit-form";
import Breadcrumbs from "@/app/ui/users/breadcrumbs";
import { Users } from "@/app/lib/definitions";
import { notFound } from "next/navigation";
import { fetchUserById } from "@/app/lib/usersDB";

export default async function Page({ params }: { params: { id: string } }) {
    const id = parseInt(params?.id);
    const [user]: [Users | undefined] = await Promise.all([fetchUserById(id)]);

    if (!user) {
        notFound();
    }

    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Edit Customer",
                        href: `/dashboard/customers/${id}/edit`,
                        active: true,
                    },
                ]}
            />
            <Form user={user!} />
        </main>
    );
}
