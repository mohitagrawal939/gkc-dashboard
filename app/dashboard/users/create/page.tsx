import Form from "@/app/ui/users/create-form";
import Breadcrumbs from "@/app/ui/users/breadcrumbs";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Users", href: "/dashboard/users" },
                    {
                        label: "Add user",
                        href: "/dashboard/users/create",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
