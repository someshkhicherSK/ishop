// const Category = require("../models/category.model");
// const Product = require("../models/product.model");
// const fs = require("fs");

// exports.getCategory = async (req,res)=>{
//  const cats = await Category.find();
//  res.send({data:cats});
// };

// exports.createCategory = async(req,res)=>{
//  const {name,slug}=req.body;
//  const img=req.files.image;

//  const filename=Date.now()+img.name;
//  img.mv("./public/images/categoryImg/"+filename);

//  await Category.create({name,slug,image:filename});
//  res.send({msg:"created"});
// };

// exports.status = async(req,res)=>{
//  const {flag}=req.body;
//  const cat=await Category.findById(req.params.id);

//  let obj={};

//  if(flag=="1") obj.status=!cat.status;
//  if(flag=="2") obj.on_home=!cat.on_home;
//  if(flag=="3") obj.is_top=!cat.is_top;
//  if(flag=="4") obj.is_best=!cat.is_best;

//  await Category.findByIdAndUpdate(cat._id,obj);
//  res.send({msg:"updated"});
// };

// exports.deleteCategory=async(req,res)=>{
//  const cat=await Category.findById(req.params.id);
//  fs.unlinkSync("./public/images/categoryImg/"+cat.image);
//  await Category.findByIdAndDelete(cat._id);
//  res.send({msg:"deleted"});
// };



// const Category = require("../models/category.model");
// const Product = require("../models/product.model");
// const fs = require("fs");

// exports.getCategory = async (req, res) => {
//   const cats = await Category.find();
//   res.send({ data: cats });
// };

// exports.getSingleCategory = async (req, res) => {
//   try {
//     const cat = await Category.findById(req.params.id);

//     if (!cat) {
//       return res.status(404).send({
//         msg: "Category not found",
//       });
//     }

//     res.send({
//       data: cat,
//     });
//   } catch (error) {
//     res.status(500).send({
//       msg: error.message,
//     });
//   }
// };

// exports.createCategory = async (req, res) => {
//   const { name, slug } = req.body;
//   const img = req.files.image;

//   const filename = Date.now() + img.name;

//   img.mv("./public/images/categoryImg/" + filename);

//   await Category.create({
//     name,
//     slug,
//     image: filename,
//   });

//   res.send({
//     msg: "created",
//   });
// };

// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, slug } = req.body;

//     const cat = await Category.findById(req.params.id);

//     let updateObj = {
//       name,
//       slug,
//     };

//     if (req.files && req.files.image) {
//       const img = req.files.image;

//       const filename = Date.now() + img.name;

//       img.mv("./public/images/categoryImg/" + filename);

//       if (cat.image) {
//         const oldPath = "./public/images/categoryImg/" + cat.image;

//         if (fs.existsSync(oldPath)) {
//           fs.unlinkSync(oldPath);
//         }
//       }

//       updateObj.image = filename;
//     }

//     await Category.findByIdAndUpdate(req.params.id, updateObj);

//     res.send({
//       msg: "updated",
//     });
//   } catch (error) {
//     res.status(500).send({
//       msg: error.message,
//     });
//   }
// };

// exports.status = async (req, res) => {
//   const { flag } = req.body;

//   const cat = await Category.findById(req.params.id);

//   let obj = {};

//   if (flag == "1") obj.status = !cat.status;
//   if (flag == "2") obj.on_home = !cat.on_home;
//   if (flag == "3") obj.is_top = !cat.is_top;
//   if (flag == "4") obj.is_best = !cat.is_best;

//   await Category.findByIdAndUpdate(cat._id, obj);

//   res.send({
//     msg: "updated",
//   });
// };

// exports.deleteCategory = async (req, res) => {
//   const cat = await Category.findById(req.params.id);

//   if (cat?.image) {
//     const oldPath = "./public/images/categoryImg/" + cat.image;

//     if (fs.existsSync(oldPath)) {
//       fs.unlinkSync(oldPath);
//     }
//   }

//   await Category.findByIdAndDelete(req.params.id);

//   res.send({
//     msg: "deleted",
//   });
// };





const { uploadImage, isRemoteUrl } = require("../utility/uploadImage");
const { resolveCategoryImage } = require("../utility/resolveImageUrl");
const Category = require("../models/category.model");
const Product = require("../models/product.model");
const fs = require("fs");
const path = require("path");

exports.getCategory = async (req, res) => {
  const cats = await Category.find();
  res.send({ data: cats.map(resolveCategoryImage) });
};

exports.getSingleCategory = async (req, res) => {
  try {
    const cat = await Category.findById(req.params.id);

    if (!cat) {
      return res.status(404).send({
        msg: "Category not found",
      });
    }

    res.send({
      data: resolveCategoryImage(cat),
    });
  } catch (error) {
    res.status(500).send({
      msg: error.message,
    });
  }
};


// exports.createCategory = async (req, res) => {
//   const { name, slug } = req.body;
//   const img = req.files.image;

//   const filename = Date.now() + img.name;

//   img.mv("./public/images/categoryImg/" + filename);

//   await Category.create({
//     name,
//     slug,
//     image: filename,
//   });

//   res.send({
//     msg: "created",
//   });
// };
// exports.createCategory = async (req, res) => {
//     console.log("CREATE CATEGORY API HIT");

//   try {
//     const { name, slug } = req.body;
//     const img = req.files.image;
//     console.log("Image =", img?.name);

//     const filename = Date.now() + img.name;

//     console.log("Saving File =", filename);

//     img.mv("./public/images/categoryImg/" + filename, (err) => {
//       if (err) {
//         console.log("Upload Error =", err);
//       } else {
//         console.log("Uploaded Successfully");
//       }
//     });

//     await Category.create({
//       name,
//       slug,
//       image: filename,
//     });

//     res.send({
//       msg: "created",
//     });
//   } catch (error) {
//     res.status(500).send({
//       msg: error.message,
//     });
//   }
// };
// exports.createCategory = async (req, res) => {
//   try {
//     const { name, slug } = req.body;

//     const img = req.files.image;

//     const upload = await imagekit.upload({
//       file: img.data,
//       fileName: Date.now() + "-" + img.name,
//       folder: "/categories",
//     });

//     await Category.create({
//       name,
//       slug,
//       image: upload.url,
//     });

//     res.send({
//       msg: "created",
//     });
//   } catch (error) {
//     console.log(error);
//     res.status(500).send({
//       msg: error.message,
//     });
//   }
// };

exports.createCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;
    const img = req.files?.image;

    if (!img) {
      return res.status(400).send({ msg: "Image is required" });
    }

    const image = await uploadImage(img, "categoryImg");

    await Category.create({
      name,
      slug,
      image,
    });

    res.send({
      msg: "created",
    });
  } catch (error) {
    console.log("CATEGORY UPLOAD ERROR =", error);

    res.status(500).send({
      msg: error.message,
    });
  }
};
// exports.updateCategory = async (req, res) => {
//   try {
//     const { name, slug } = req.body;

//     const cat = await Category.findById(req.params.id);

//     let updateObj = {
//       name,
//       slug,
//     };

//     if (req.files && req.files.image) {
//       const img = req.files.image;

//       const filename = Date.now() + img.name;

//       img.mv("./public/images/categoryImg/" + filename);

//       if (cat.image) {
//         const oldPath = "./public/images/categoryImg/" + cat.image;

//         if (fs.existsSync(oldPath)) {
//           fs.unlinkSync(oldPath);
//         }
//       }

//       updateObj.image = filename;
//     }

//     await Category.findByIdAndUpdate(req.params.id, updateObj);

//     res.send({
//       msg: "updated",
//     });
//   } catch (error) {
//     res.status(500).send({
//       msg: error.message,
//     });
//   }
// };
exports.updateCategory = async (req, res) => {
  try {
    const { name, slug } = req.body;

    const updateObj = {
      name,
      slug,
    };

    if (req.files && req.files.image) {
      updateObj.image = await uploadImage(req.files.image, "categoryImg");
    }

    await Category.findByIdAndUpdate(
      req.params.id,
      updateObj
    );

    res.send({
      msg: "updated",
    });
  } catch (error) {
    console.log(error);

    res.status(500).send({
      msg: error.message,
    });
  }
};
exports.status = async (req, res) => {
  const { flag } = req.body;

  const cat = await Category.findById(req.params.id);

  let obj = {};

  if (flag == "1") obj.status = !cat.status;
  if (flag == "2") obj.on_home = !cat.on_home;
  if (flag == "3") obj.is_top = !cat.is_top;
  if (flag == "4") obj.is_best = !cat.is_best;

  await Category.findByIdAndUpdate(cat._id, obj);

  res.send({
    msg: "updated",
  });
};

exports.deleteCategory = async (req, res) => {
  const cat = await Category.findById(req.params.id);

  if (cat?.image && !isRemoteUrl(cat.image)) {
    const oldPath = path.join(
      __dirname,
      "..",
      "public",
      "images",
      "categoryImg",
      cat.image
    );

    if (fs.existsSync(oldPath)) {
      fs.unlinkSync(oldPath);
    }
  }

  await Category.findByIdAndDelete(req.params.id);

  res.send({
    msg: "deleted",
  });
};