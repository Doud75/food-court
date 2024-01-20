-- Insertion dans la table "user"
INSERT INTO "user" ("id", "email", "password", "role")
VALUES
    ('1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', 'user1@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'customer'),
    ('2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', 'user2@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'customer'),
    ('3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', 'user3@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'admin');

-- Insertion dans la table "restaurant"
INSERT INTO "restaurant" ("id", "password", "name", "category")
VALUES
    ('4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant1', 'Italian'),
    ('5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant2', 'Chinese'),
    ('6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant3', 'Mexican');

-- Insertion dans la table "menu"
INSERT INTO "menu" ("id", "dishes", "price", "restaurant_id")
VALUES
    ('7c8d5e6f-1a2b-3c4d-5e6f-7a8b9c0d1e2f', 'Pasta Carbonara', 12.99, '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f'),
    ('8b9c1d2e-3f4a-5b6c-7d8e-9f0a1b2c3d4e', 'Sweet and Sour Chicken', 14.99, '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e'),
    ('9c0d1e2f-3a4b-5c6d-8e9f-0a1b2c3d4e5f', 'Tacos', 9.99, '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f');

-- Insertion dans la table "order"
INSERT INTO "order" ("id", "dishes_list", "total_price", "reference", "user_id", "restaurant_id")
VALUES
    ('76bee911-645f-4260-8065-1c5636c27feb', '{"Pasta Carbonara": 1, "Tiramisu": 2}', 29.97, 123456789, '1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f'),
    ('75dfd2b8-7df5-4b16-814e-087655104c47', '{"Sweet and Sour Chicken": 3, "Fried Rice": 1}', 59.96, 987654321, '2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e'),
    ('b58993e3-85fc-4d2c-9dcd-25db20f54ffa', '{"Tacos": 5, "Guacamole": 2}', 74.93, 456789012, '3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f');
