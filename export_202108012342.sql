INSERT INTO public.address (house,street,city,state_id,pincode) VALUES
	 ('my house','4','rajkot',1,360005),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006);
INSERT INTO public.address (house,street,city,state_id,pincode) VALUES
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','rajkot',1,360006),
	 ('myhouse','4','jamanagar',1,389098),
	 ('your house','4','rajkott',1,360006),
	 ('my house','4','rajkot',1,360005),
	 ('myhouse','4','rajkot',1,360006);INSERT INTO public.announcements (hospital_admin_id,hospital_id,title,body,is_active) VALUES
	 (1,16,'rushi','rushi nariyais here',NULL);INSERT INTO public.doctors (user_id,hospital_id,education,specialities) VALUES
	 (2,13,'masters','new ones');INSERT INTO public.hospital_admins (user_id,hospital_id) VALUES
	 (1,16);INSERT INTO public.hospitals (name,address_id,contact_no,email,website,hours_of_operation,diseases) VALUES
	 ('asopalav',2,'9999999990','asp@gmail.com','undefined','24','heart'),
	 ('asopalav',14,'9999999990','asp@gmail.com','undefined','24','heart'),
	 ('rudra',15,'9999999990','rudra@gmail.com','undefined','24','heart'),
	 ('asopalavvv',19,'9999999990','asp@gmail.com','http://localhost:5000/hospital/add','24','heart');INSERT INTO public.patients (user_id,weight,height,diseases,sc_name,sc_email,admit_status) VALUES
	 (4,65.0,5.5,'heart','pp','pp@gmail.com',NULL);INSERT INTO public.roles (name) VALUES
	 ('admin'),
	 ('hospitaladmin'),
	 ('patient'),
	 ('doctor');INSERT INTO public.states (name) VALUES
	 ('gujarat'),
	 ('rajasthan'),
	 ('maharastra');INSERT INTO public.users (firstname,lastname,email,phone,birthdate,address_id,"password",role_id,is_active) VALUES
	 ('rushi','patel','rp@gmail.com','9999999990','2000-10-10',1,'$2b$10$TC7/JrH3ZfPGtyH.x4CrV.vlD8q0Cq/fzIs2PYkRT8B3l4xOgjSSC',2,true),
	 ('rusii','patell','rp@gmail.com','9999999990','2000-10-10',17,'$2b$10$Hbuz935iPqxhCFi0oyjwOeTzXn3uQbjZ9qB2zE.sMlxg6awyL0Si6',2,true),
	 ('parth','patel','pp@gmail.com','9909090909','2000-10-10',1,'$2b$10$TC7/JrH3ZfPGtyH.x4CrV.vlD8q0Cq/fzIs2PYkRT8B3l4xOgjSSC',1,NULL),
	 ('patient','patel','pp@gmail.com','9999999990','2000-10-10',18,'$2b$10$6PgW4njHccEH76Xs/T2ch.6/4Ayzqy3JowJddEyEBnDoGByy3RD1q',4,true);
	 
	 
	 CREATE TABLE "states" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(30)
);

CREATE TABLE "address" (
  "id" SERIAL PRIMARY KEY,
  "house" varchar(30),
  "street" varchar(50),
  "city" varchar(30),
  "state_id" int,
  "pincode" int
);

CREATE TABLE "users" (
  "id" SERIAL PRIMARY KEY,
  "firstname" varchar(30),
  "lastname" varchar(30),
  "email" varchar(80),
  "phone" varchar(15),
  "birthdate" date,
  "address_id" int,
  "password" varchar(100),
  "role_id" int,
  "is_active" boolean
);

CREATE TABLE "resources" (
  "resources_id" int PRIMARY KEY,
  "resources_name" varchar
);

CREATE TABLE "permissions" (
  "permission_id" int PRIMARY KEY,
  "role_id" int,
  "resources_id" int,
  "permissions_name" varchar
);

CREATE TABLE "roles" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(30)
);

CREATE TABLE "privilages" (
  "user_id" int,
  "code" varchar(10),
  PRIMARY KEY ("user_id", "code")
);

CREATE TABLE "notes" (
  "id" SERIAL PRIMARY KEY,
  "admin_id" int,
  "title" varchar(100),
  "body" varchar(1000),
  "is_active" boolean
);

CREATE TABLE "patients" (
  "user_id" int PRIMARY KEY,
  "weight" float,
  "height" float,
  "diseases" varchar(500),
  "sc_name" varchar(50),
  "sc_email" varchar(80),
  "admit_status" boolean
);

CREATE TABLE "patient_appointments" (
  "id" SERIAL PRIMARY KEY,
  "patient_id" int,
  "hospital_id" int,
  "doctor_id" int,
  "appointment_date" date,
  "start_time" time,
  "end_time" time,
  "follow_up" boolean
);

CREATE TABLE "patient_diagnose" (
  "appointment_id" int PRIMARY KEY,
  "disease" varchar(500),
  "prescription" varchar(1000)
);

CREATE TABLE "queryConcerns" (
  "id" SERIAL PRIMARY KEY,
  "patient_id" int,
  "query" varchar(1000),
  "hospital_id" int,
  "doctor_needed" boolean,
  "doctor_id" int,
  "is_answered" boolean,
  "answer" varchar(1000),
  "is_deleted" boolean
);

CREATE TABLE "doctors" (
  "user_id" int PRIMARY KEY,
  "hospital_id" int,
  "education" varchar(200),
  "specialities" varchar(200)
);

CREATE TABLE "doctor_appointments" (
  "id" SERIAL PRIMARY KEY,
  "doctor_id" int,
  "appointment_date" date,
  "start_time" time,
  "end_time" time,
  "patient_id" int
);

CREATE TABLE "hospitals" (
  "id" SERIAL PRIMARY KEY,
  "name" varchar(50),
  "address_id" int,
  "contact_no" varchar(15),
  "email" varchar(80),
  "website" varchar(80),
  "hours_of_operation" varchar(50),
  "diseases" varchar(500)
);

CREATE TABLE "hospitalAdmins" (
  "user_id" int,
  "hospital_id" int,
  PRIMARY KEY ("user_id", "hospital_id")
);

CREATE TABLE "announcements" (
  "id" SERIAL PRIMARY KEY,
  "hospital_admin_id" int,
  "hospital_id" int,
  "title" varchar(100),
  "body" varchar(1000),
  "is_active" boolean
);


ALTER TABLE "address" ADD FOREIGN KEY ("state_id") REFERENCES "states" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "users" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "privilages" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "notes" ADD FOREIGN KEY ("admin_id") REFERENCES "users" ("id");

ALTER TABLE "patients" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "patient_appointments" ADD FOREIGN KEY ("patient_id") REFERENCES "users" ("id");

ALTER TABLE "patient_appointments" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("id");

ALTER TABLE "patient_appointments" ADD FOREIGN KEY ("doctor_id") REFERENCES "users" ("id");

ALTER TABLE "patient_diagnose" ADD FOREIGN KEY ("appointment_id") REFERENCES "patient_appointments" ("id");

ALTER TABLE "queryConcerns" ADD FOREIGN KEY ("patient_id") REFERENCES "users" ("id");

ALTER TABLE "queryConcerns" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("id");

ALTER TABLE "queryConcerns" ADD FOREIGN KEY ("doctor_id") REFERENCES "users" ("id");

ALTER TABLE "doctors" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "doctors" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("id");

ALTER TABLE "doctor_appointments" ADD FOREIGN KEY ("doctor_id") REFERENCES "users" ("id");

ALTER TABLE "doctor_appointments" ADD FOREIGN KEY ("patient_id") REFERENCES "users" ("id");

ALTER TABLE "hospitals" ADD FOREIGN KEY ("address_id") REFERENCES "address" ("id");

ALTER TABLE "hospitalAdmins" ADD FOREIGN KEY ("user_id") REFERENCES "users" ("id");

ALTER TABLE "hospitalAdmins" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("id");

ALTER TABLE "announcements" ADD FOREIGN KEY ("hospital_admin_id") REFERENCES "users" ("id");

ALTER TABLE "announcements" ADD FOREIGN KEY ("hospital_id") REFERENCES "hospitals" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("role_id") REFERENCES "roles" ("id");

ALTER TABLE "permissions" ADD FOREIGN KEY ("resources_id") REFERENCES "resources" ("resources_id");