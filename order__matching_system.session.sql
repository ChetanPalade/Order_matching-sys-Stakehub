--CREATE TABLE pending_orders(
--     ID SERIAL PRIMARY KEY,
--     BUYER_QTY INT NOT NULL,
--     BUYER_PRICE INT NOT NULL,
--     SELLER_PRICE DECIMAL(10,2) NOT NULL,
--     SELLER_QTY INT NOT NULL
-- );

-- --DELETE FROM pending_orders
-- WHERE BUYER_PRICE= "100";

--INSERT INTO pending_orders (ID,BUYER_QTY,BUYER_PRICE,SELLER_PRICE,SELLER_QTY)
--VALUES ("5","10","96","104","70");


-- DELETE FROM pending_orders
--WHERE ID = "NULL";

--SELECT * FROM pending_orders
--WHERE ID LIKE "NULL";

-- --CREATE TABLE Completedd_order(
--     ID SERIAL PRIMARY KEY,
--     PRICE DECIMAL(10,2) NOT NULL,
--     QTY INT NOT NULL,
--     CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );


 
DROP TABLE PendingOrderTable