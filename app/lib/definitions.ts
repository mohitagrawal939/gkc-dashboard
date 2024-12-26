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

export type Customers = {
    id: number;
    first_name: string;
    middle_name: string;
    last_name: string;
    gender: "male" | "female" | "other";
    dob: string;
    mobile_no: string;
    email: string;
    address: string;
    uan_no: string;
    uan_password: string;
    aadhaar_no: string;
    pan_no: string;
    bank_acc_no: string;
    bank_name: string;
    bank_branch_name: string;
    bank_ifsc_code: string;
    remark: string;
    created_at: string;
    updated_at: string;
    deleted_at: string;
};
