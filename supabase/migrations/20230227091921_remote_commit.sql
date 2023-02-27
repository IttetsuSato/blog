alter table "auth"."users" add column "deleted_at" timestamp with time zone;

alter table "auth"."users" alter column "phone" set data type text using "phone"::text;

alter table "auth"."users" alter column "phone_change" set data type text using "phone_change"::text;


create sequence "public"."countries_id_seq";

create table "public"."countries" (
    "id" integer not null default nextval('countries_id_seq'::regclass),
    "name" character varying(255) not null
);


alter sequence "public"."countries_id_seq" owned by "public"."countries"."id";

CREATE UNIQUE INDEX countries_pkey ON public.countries USING btree (id);

alter table "public"."countries" add constraint "countries_pkey" PRIMARY KEY using index "countries_pkey";


