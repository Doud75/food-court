-- Insertion dans la table "user"
INSERT INTO "user" ("id", "email", "password", "role")
VALUES
    ('1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', 'user1@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'customer'),
    ('2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', 'user2@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'customer'),
    ('3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', 'user3@example.com', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'admin');

-- Insertion dans la table "restaurant"
INSERT INTO "restaurant" ("id", "password", "name", "category", "description")
VALUES
    ('4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant1', 'Italian', 'Authentic Italian cuisine in a cozy atmosphere.'),
    ('5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant2', 'Chinese', 'Delicious Chinese dishes served with a modern twist.'),
    ('6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f', '$2a$14$Xu.XQOjOUTlPS7iHtRUqTO/ba7qdU5kzL/9Hyxz61u1q7GUmEKFIa', 'Restaurant3', 'Mexican', 'Vibrant Mexican flavors and a lively atmosphere await you.');

-- Insertion dans la table "menu" pour Restaurant1 (Italian)
INSERT INTO "menu" ("id", "dishes", "price", "restaurant_id")
VALUES
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3241', 'Margherita Pizza', 10.99, '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3242', 'Risotto al Funghi', 15.99, '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3243', 'Tiramisu', 7.99, '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f'),
    ('5a2cf564-451f-4411-98f7-8b43f50225ad', 'Spring Rolls', 8.99, '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f324b', 'General Tso s Chicken', 13.99, '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3246', 'Shrimp Fried Rice', 11.99, '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3247', 'Guacamole and Chips', 6.99, '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3248', 'Enchiladas Verde', 12.99, '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f'),
    ('3e74323d-04a1-4f8f-9f18-34f8bb0f3249', 'Churros', 8.99, '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f');


-- Insertion dans la table "order" pour Restaurant1 (Italian)
INSERT INTO "order" ("id", "dishes_list", "total_price", "reference", "user_id", "restaurant_id", "state")
VALUES
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b1', '{"Margherita Pizza" : 1, "Risotto al Funghi" : 1}', 26.98, 111111111, '1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b2', '{"Margherita Pizza" : 1, "Tiramisu" : 1}', 18.98, 222222222, '2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b3', '{"Risotto al Funghi" : 1, "Tiramisu" : 1}', 23.98, 333333333, '3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', '4d9e61c0-5e8a-4b1f-9c8d-2a3b4c5d6e7f', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b4', '{"Spring Rolls" : 1, "General Tsos Chicken" : 1}', 22.98, 444444444, '1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b5', '{"General Tsos Chicken" : 1, "Shrimp Fried Rice" : 1}', 25.98, 555555555, '2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b6', '{"Spring Rolls" : 1, "Shrimp Fried Rice" : 1}', 20.98, 666666666, '3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', '5e7f3d2c-1b4a-5d6e-8f9c-3a2b1f4c5d6e', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b7', '{"Tacos" : 1, "Enchiladas Verde" : 1}', 21.98, 777777777, '1a6c23e7-4c5e-4a2d-b038-8a7f9f2e15a1', '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b8', '{"Guacamole and Chips" : 1, "Churros" : 1}', 15.98, 888888888, '2b7d34f8-3a1c-4f9e-8c2b-9d6e5f4c2b2a', '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f', 'pending'),
    ('2da1674f-058a-4062-ba5b-95d1d0d1b7b9', '{"Tacos" : 1, "Churros" : 1}', 18.98, 999999999, '3c8e45d9-2b9d-4c8a-a1b3-5e6f7d8c9e3a', '6e8f9d2c-3a4b-5e6f-1c8d-2b1f4c5d6e7f', 'pending');

