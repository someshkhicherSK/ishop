// const express = require('express');
// const mongoose = require('mongoose');
// var cookieParser = require('cookie-parser')
// const cors = require('cors');

// const categoryRoutes = require('./routes/category.route');
// const colorRoutes = require('./routes/color.route');
// const brandRoutes = require('./routes/brand.route');
// const productRoutes = require('./routes/product.route');
// const adminRoutes = require('./routes/admin.routes');
// const userRoutes = require('./routes/user.routes');
// const cartRoutes = require('./routes/cart.routes');
// const orderRoutes = require('./routes/order.routes');
// const contactRoutes = require('./routes/contact.routes');
// const server = express();
// mongoose.set('strictQuery', true);
// require('dotenv').config();
// server.use(express.json());
// server.use(cors({
//   origin: ["http://localhost:3000"],
//   credentials: true
// }));
// server.use(cookieParser())
// server.use('/category', categoryRoutes)
// server.use('/color', colorRoutes)
// server.use('/brands', brandRoutes)
// server.use('/product', productRoutes)
// server.use('/admin', adminRoutes)
// server.use('/user', userRoutes)
// server.use('/cart', cartRoutes)
// server.use('/cart', cartRoutes)
// server.use('/order', orderRoutes)
// server.use('/contact', contactRoutes)

// server.use(express.static('./public'));


// mongoose.connect(process.env.DATABASE_URL, { dbName: process.env.DB_NAME }).then(() => {
//     console.log("Database is connected...")
//     server.listen(process.env.PORT, () => {
//         console.log("Server is running...")
//     })
// }).catch((err) => {
//     console.log(err)
// });




require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const categoryRoutes = require("./routes/category.route");
const colorRoutes = require("./routes/color.route");
const brandRoutes = require("./routes/brand.route");
const productRoutes = require("./routes/product.route");
const adminRoutes = require("./routes/admin.routes");
const userRoutes = require("./routes/user.routes");
const cartRoutes = require("./routes/cart.routes");
const orderRoutes = require("./routes/order.routes");
const contactRoutes = require("./routes/contact.routes");

const server = express();

mongoose.set("strictQuery", true);

server.use(express.json());

server.use(
  cors({
    origin: ["http://localhost:3000"],
    credentials: true,
  })
);

server.use(cookieParser());

server.use("/category", categoryRoutes);
server.use("/color", colorRoutes);
server.use("/brands", brandRoutes);
server.use("/product", productRoutes);
server.use("/admin", adminRoutes);
server.use("/user", userRoutes);
server.use("/cart", cartRoutes);
server.use("/order", orderRoutes);
server.use("/contact", contactRoutes);

server.use(express.static("./public"));

mongoose
  .connect(process.env.MONGODB_URI, {
    dbName: process.env.DB_NAME,
  })
  .then(() => {
    console.log("✅ Database connected");

    server.listen(process.env.PORT, () => {
      console.log("✅ Server running on", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log("Mongo Error:", err);
  });

