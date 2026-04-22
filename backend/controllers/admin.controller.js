// // const adminModel = require('../models/admin.model');
// // var jwt = require('jsonwebtoken');
// // const adminController = {
// //     async adminLogin(req, res) {
// //         const { email, password } = req.body;
// //         try {
// //             const admin = await adminModel.findOne({ email });
// //             if (!admin) return res.status(301).json({ msg: "Admin Not Exsit..", success: false });
// //             if (password !== admin.password) return res.status(301).json({ msg: "password not match..", success: false });
// //             const token = jwt.sign({
// //                 id: admin._id,
// //                 email: admin.email
// //             }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
// //             return res.status(201).json({ msg: "Admin  Login...", success: true, token })
// //         } catch (error) {
// //             return res.status(501).json({ msg: "Internal Server Error...", success: false })
// //         }
// //     },
// // };

// // module.exports = adminController;






// const adminModel = require("../models/admin.model");
// const jwt = require("jsonwebtoken");

// const adminController = {
//   async adminLogin(req, res) {
//     try {
//       const { email, password } = req.body;

//       const admin = await adminModel.findOne({ email });

//       if (!admin)
//         return res.status(404).json({ msg: "Admin not found", success: false });

//       if (password !== admin.password)
//         return res.status(401).json({ msg: "Password incorrect", success: false });

//       const token = jwt.sign(
//         { id: admin._id, email: admin.email },
//         process.env.SECRET_KEY_JWT,
//         { expiresIn: "2d" }
//       );

//       return res.status(200).json({
//         msg: "Admin login success",
//         success: true,
//         token,
//         admin: {
//           id: admin._id,
//           email: admin.email,
//           role: admin.role,
//         },
//       });

//     } catch (error) {
//       console.log("ADMIN LOGIN ERROR:", error);
//       return res.status(500).json({ msg: "Internal Server Error", success: false });
//     }
//   },
// };

// module.exports = adminController;

require("dotenv").config();
const adminModel = require("../models/admin.model");
const jwt = require("jsonwebtoken");

// fallback safety
const JWT_SECRET = process.env.SECRET_KEY_JWT || process.env.SECRETKEY;

const adminController = {
  async adminLogin(req, res) {
    try {
      const { email, password } = req.body;

      if (!JWT_SECRET) {
        return res.status(500).json({
          msg: "JWT Secret missing in env",
          success: false,
        });
      }

      const admin = await adminModel.findOne({ email });

      if (!admin)
        return res.status(404).json({ msg: "Admin not found", success: false });

      if (password !== admin.password)
        return res.status(401).json({ msg: "Password incorrect", success: false });

      const token = jwt.sign(
        { id: admin._id, email: admin.email },
        JWT_SECRET,
        { expiresIn: "2d" }
      );

      return res.status(200).json({
        msg: "Admin login success",
        success: true,
        token,
        admin: {
          id: admin._id,
          email: admin.email,
          role: admin.role,
        },
      });

    } catch (error) {
      console.log("ADMIN LOGIN ERROR:", error);
      return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
  },
};

module.exports = adminController;
