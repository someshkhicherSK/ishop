// const userModel = require('../models/user.model');
// var jwt = require('jsonwebtoken');
// const Cryptr = require('cryptr');
// const { findById } = require('../models/category.model');
// require('dotenv').config();
// const cryptr = new Cryptr(process.env.Crtyper_Key);
// const userController = {

//     async getuser(req, res) {
//         try {
//             const { id } = req.params;
//             let user = null
//             if (id) {
//                 user = await userModel.findById(id);
//             } else {
//                 user = await userModel.find();
//             }
//             const data = {
//                 user: {
//                     ...user.toJSON(),
//                     password: null,
//                 },
//             }
//             res.status(200).json({ msg: "user found..", success: true, data });
//             if (!user) {
//                 res.status(402).json({ msg: "user not found..", success: false });
//             }
//         } catch (error) {
//             console.log(error)
//         }
//     },
//     async register(req, res) {
//         const { name, email, password } = req.body;
//         try {
//             const exsiting = await userModel.findOne({ email: email });
//             if (exsiting) return res.status(409).json({ msg: "Account already exists...😂", success: false });

//             const encryptedPass = cryptr.encrypt(password);
//             const user = await userModel.create({
//                 name,
//                 email,
//                 password: encryptedPass
//             })
//             const token = jwt.sign({
//                 email: email
//             }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
//             await user.save()
//             const newuser = {
//                 ...user.toJSON(),
//                 password: null,
//                 token
//             }
//             return res.status(201).json({ msg: "Account created successfully...😍", success: true, newuser })
//         } catch (error) {
//             console.log(error)
//             return res.status(501).json({ msg: "Internal Server Error...", success: false })
//         }
//     },
//     async login(req, res) {
//         const { email, password } = req.body;
//         try {
//             const exsiting = await userModel.findOne({ email });
//             if (!exsiting) return res.status(401).json({ msg: "User not found...🤦‍♀️", success: false });
//             const decryptedPass = cryptr.decrypt(exsiting.password);
//             if (password != decryptedPass) return res.status(401).json({ msg: "Invalid password...😢", success: false });
//             const token = jwt.sign({
//                 email: email
//             }, process.env.SECRET_KEY_JWT, { expiresIn: '2d' });
//             const data = {
//                 user: {
//                     ...exsiting.toJSON(),
//                     password: null,
//                 },
//                 token

//             }
//             return res.status(200).json({ msg: "Login successful...😘", success: true, data })
//         } catch (error) {
//             return res.status(501).json({ msg: "Internal Server Error...", success: false })
//         }
//     },
//     async address(req, res) {
//         try {
//             const id = req.params.userId;
//             const newAddress = req.body;
//             const limit = await userModel.findById(id);
//             if (limit.shipping_address.length >= 3) {
//                 return res.status(409).json({ msg: "Maximum limit reached ." });
//             }
//             const updatedUser = await userModel.findByIdAndUpdate(
//                 id,
//                 { $push: { shipping_address: newAddress } },
//             );

//             if (!updatedUser) {
//                 return res.status(404).json({ msg: "User not found" });
//             }
//             await updatedUser.save()
            
//             const Userdata = await userModel.findById(id)
//             const data = {
//                 ...Userdata.toJSON(),
//                 password: null,

//             }
//             res.status(200).json({
//                 msg: "Address added successfully",
//                 user: data,
//             });



//         } catch (error) {
//             console.log(error)
//         }
//     },

//     async deleteAddress(req, res) {
//         try {
//             const { id, index } = req.params;
//             const existing = await userModel.findById(id);
//             if (!existing) return res.status(404).json({ msg: "User not found", success: false });
//             if (index < 0 || index >= existing.shipping_address.length) {
//                 return res.status(400).json({ msg: "Invalid address index", success: false });
//             }

//             existing.shipping_address.splice(index, 1);
//             await existing.save();

//             const user = {
//                 ...existing.toJSON(),
//                 password: null,
//             }
//             res.status(200).json({
//                 msg: "Address deleted successfully",
//                 success: true, user
//             });


//         } catch (error) {
//             console.log(error)
//             res.status(500).json({ msg: "Server error", error: error.message });
//         }
//     },
//     async updatePassword(req, res) {
//         try {
//             const { id } = req.params;
//             const { new_pass, curr_pass } = req.body;

//             const exsiting = await userModel.findById(id);
//             if (!exsiting) return res.status(404).json({ msg: "User not found..", success: false });
//             const decryptedPass = cryptr.decrypt(exsiting.password);

//             if (decryptedPass != curr_pass) return res.status(400).json({ msg: "Old password does not match..", success: false });

//             const encryptedPass = cryptr.encrypt(new_pass);
//             const user = await userModel.findByIdAndUpdate(id, {
//                 $set: { password: encryptedPass }
//             });
//             return res.status(200).json({ msg: "Password updated successfully....", success: true,user });


//         } catch (error) {
//             console.log(error)
//         }
//     },

// };


// module.exports = userController;




require("dotenv").config();
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const Cryptr = require("cryptr");

const cryptr = new Cryptr(process.env.Crtyper_Key || "default_key");

const JWT_SECRET = process.env.SECRET_KEY_JWT || process.env.SECRETKEY;

const userController = {

  async getuser(req, res) {
    try {
      const { id } = req.params;

      let user;
      if (id) user = await userModel.findById(id);
      else user = await userModel.find();

      if (!user)
        return res.status(404).json({ msg: "user not found", success: false });

      const data = Array.isArray(user)
        ? user.map(u => ({ ...u.toJSON(), password: null }))
        : { ...user.toJSON(), password: null };

      res.status(200).json({ msg: "user found", success: true, data });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error", success: false });
    }
  },

  async register(req, res) {
    try {
      const { name, email, password } = req.body;

      const existing = await userModel.findOne({ email });
      if (existing)
        return res.status(409).json({ msg: "Account already exists", success: false });

      const encryptedPass = cryptr.encrypt(password);

      const user = await userModel.create({
        name,
        email,
        password: encryptedPass,
      });

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2d" });

      const newuser = {
        ...user.toJSON(),
        password: null,
        token,
      };

      return res.status(201).json({
        msg: "Account created successfully",
        success: true,
        newuser,
      });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;

      const existing = await userModel.findOne({ email });
      if (!existing)
        return res.status(401).json({ msg: "User not found", success: false });

      const decryptedPass = cryptr.decrypt(existing.password);

      if (password !== decryptedPass)
        return res.status(401).json({ msg: "Invalid password", success: false });

      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "2d" });

      const data = {
        user: {
          ...existing.toJSON(),
          password: null,
        },
        token,
      };

      return res.status(200).json({ msg: "Login successful", success: true, data });

    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal Server Error", success: false });
    }
  },

  async address(req, res) {
    try {
      const id = req.params.userId;
      const newAddress = req.body;

      const user = await userModel.findById(id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      if (user.shipping_address.length >= 3)
        return res.status(409).json({ msg: "Maximum address limit reached" });

      user.shipping_address.push(newAddress);
      await user.save();

      res.status(200).json({
        msg: "Address added successfully",
        user: { ...user.toJSON(), password: null },
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  },

  async deleteAddress(req, res) {
    try {
      const { id, index } = req.params;

      const user = await userModel.findById(id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      user.shipping_address.splice(index, 1);
      await user.save();

      res.status(200).json({
        msg: "Address deleted",
        success: true,
        user: { ...user.toJSON(), password: null },
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  },

  async updatePassword(req, res) {
    try {
      const { id } = req.params;
      const { new_pass, curr_pass } = req.body;

      const user = await userModel.findById(id);
      if (!user) return res.status(404).json({ msg: "User not found" });

      const decrypted = cryptr.decrypt(user.password);
      if (decrypted !== curr_pass)
        return res.status(400).json({ msg: "Old password incorrect" });

      user.password = cryptr.encrypt(new_pass);
      await user.save();

      res.status(200).json({ msg: "Password updated", success: true });

    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "Server error" });
    }
  },
};

module.exports = userController;

