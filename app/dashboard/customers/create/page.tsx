import Form from "@/app/ui/users/create-form";
import Breadcrumbs from "@/app/ui/users/breadcrumbs";

export default async function Page() {
    return (
        <main>
            <Breadcrumbs
                breadcrumbs={[
                    { label: "Customers", href: "/dashboard/customers" },
                    {
                        label: "Add Customer",
                        href: "/dashboard/customers/create",
                        active: true,
                    },
                ]}
            />
            <Form />
        </main>
    );
}
