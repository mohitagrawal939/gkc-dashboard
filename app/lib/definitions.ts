export type Users = {
    id: number;
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    status: "active" | "inactive";
    created_at: string;
    updated_at: string;
    deleted_at: string;
};
