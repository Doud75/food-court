CREATE TABLE "user"(
    "id" UUID PRIMARY KEY NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "role" VARCHAR(255) NOT NULL
);

CREATE TABLE "restaurant"(
    "id" UUID PRIMARY KEY NOT NULL,
    "password" VARCHAR(255) NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "category" VARCHAR(255) NOT NULL,
    "description" VARCHAR(255) NOT NULL
);

CREATE TABLE "menu"(
    "id" UUID PRIMARY KEY NOT NULL,
    "dishes" VARCHAR(255) NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "restaurant_id" UUID NOT NULL
);

CREATE TABLE "order"(
    "id" UUID PRIMARY KEY NOT NULL,
    "dishes_list" jsonb NOT NULL,
    "total_price" DOUBLE PRECISION NOT NULL,
    "reference" BIGINT NOT NULL,
    "state" VARCHAR NOT NULL,
    "user_id" UUID NOT NULL,
    "restaurant_id" UUID NOT NULL
);


ALTER TABLE
    "menu" ADD CONSTRAINT "menu_restaurant_id_foreign" FOREIGN KEY("restaurant_id") REFERENCES "restaurant"("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_user_id_foreign" FOREIGN KEY("user_id") REFERENCES "user"("id");
ALTER TABLE
    "order" ADD CONSTRAINT "order_restaurant_id_foreign" FOREIGN KEY("restaurant_id") REFERENCES "restaurant"("id");
