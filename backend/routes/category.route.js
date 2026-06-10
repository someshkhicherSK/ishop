// const router=require("express").Router();
// const fileUpload=require("express-fileupload");
// const ctrl=require("../controllers/category.controller");

// router.get("/get",ctrl.getCategory);
// router.post("/create",fileUpload(),ctrl.createCategory);
// router.patch("/status/:id",ctrl.status);
// router.delete("/delete/:id",ctrl.deleteCategory);

// module.exports=router;




const router = require("express").Router();
const fileUpload = require("express-fileupload");
const ctrl = require("../controllers/category.controller");
const fileUploadOptions = require("../utility/fileUploadOptions");

router.get("/get", ctrl.getCategory);
router.get("/get/:id", ctrl.getSingleCategory);

router.post("/create", fileUpload(fileUploadOptions), ctrl.createCategory);

router.put("/update/:id", fileUpload(fileUploadOptions), ctrl.updateCategory);

router.patch("/status/:id", ctrl.status);

router.delete("/delete/:id", ctrl.deleteCategory);

module.exports = router;