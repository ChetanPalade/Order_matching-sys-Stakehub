![image](https://github.com/user-attachments/assets/c378d16e-5da0-4d33-9189-03b8db114bba)



![image](https://github.com/user-attachments/assets/d407c7db-e586-4c79-bdcf-ed0fc10a5d2c)



You would be having two Table to work on namely-“Pending Order Table’’ and “Completed
Order Table”.
In which the given table below is the list of pending orders in the system.

         //Pending Order Table

Buyer Qty Buyer Price Seller Price Seller Qty
10           99         100          20
50           98         101          20
70           97         102          130
80           96         103          150
10           96         104          70

In which this data represents is called as ‘Pending Order Table’. Wherein When the price of
buyer and seller matches , The data is Moved from Pending Order Table to “Completed Order
Table’’.

Completed Order Table
Price    Qty
100      20


Dependencies
Node.js + npm

Installation
git clone ...
cd to the repository directory 
node index.js
npm install
npm start  ('https://localhost:3000/orders')

