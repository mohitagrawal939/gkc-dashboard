--------------------------------GKC Script---------------
create table gkc_users (
	id SERIAL PRIMARY KEY,
	email VARCHAR(100),
	password VARCHAR(255),
	status VARCHAR(10),
	first_name VARCHAR(100),
	last_name VARCHAR(100),
	created_at TIMESTAMP,
	updated_at TIMESTAMP,
	deleted_at TIMESTAMP
);

-- Password  = 1234567890
insert into gkc_users (email, password, status, first_name, last_name, created_at)
values ('admin@gkc-dashboard.com','$2a$10$mkSH1oysDwqr3z9U.WvnPu7dbb/cqYYVc/qILK41gp9O5iH3HKA06', 'active', 'Mohit', 'Agrawal', NOW());

-- select * from gkc_users

create table gkc_customers (
	id SERIAL PRIMARY KEY,
	first_name VARCHAR(100),
	middle_name VARCHAR(100),
	last_name VARCHAR(100),
	gender VARCHAR(10),
	dob date,
	mobile_no VARCHAR(15),
	email VARCHAR(100),
	address text,
	uan_no VARCHAR(20),
	uan_password VARCHAR(50),
	aadhaar_no VARCHAR(20),
	pan_no VARCHAR(10),
	bank_acc_no VARCHAR(50),
	bank_name VARCHAR(100),
	bank_branch_name VARCHAR(50),
	bank_ifsc_code VARCHAR(20),
	remark text,
	created_at date,
	updated_at date,
	deleted_at date
);
  
  CREATE TABLE gkc_service_master (
	id SERIAL PRIMARY KEY,
	service_name VARCHAR(50),
	status boolean
);

insert into gkc_service_master (service_name,status) values ('New Service',true);
insert into gkc_service_master (service_name,status) values ('Payment Received',true);

CREATE TABLE gkc_payment_mode_master (
	id SERIAL PRIMARY KEY,
	mode_name VARCHAR(10),
	status boolean
);

insert into gkc_payment_mode_master (mode_name,status) values ('Cash',true);
insert into gkc_payment_mode_master (mode_name,status) values ('Online',true);
insert into gkc_payment_mode_master (mode_name,status) values ('Cheque',true);
insert into gkc_payment_mode_master (mode_name,status) values ('Others',true);

CREATE TABLE gkc_fees (
    id SERIAL PRIMARY KEY,
    gkc_customer_id INTEGER NOT NULL,
	gkc_service_id INTEGER NOT NULL,
	amount integer,
	payment_mode_id INTEGER NOT NULL,
	remark VARCHAR(200),
	created_at date,
  CONSTRAINT fk_gkc_customers
  FOREIGN KEY (gkc_customer_id)
  REFERENCES gkc_customers (id)
  );