const router=require("express").Router();
const fileUpload=require("express-fileupload");
const ctrl=require("../controllers/category.controller");

router.get("/get",ctrl.getCategory);
router.post("/create",fileUpload(),ctrl.createCategory);
router.patch("/status/:id",ctrl.status);
router.delete("/delete/:id",ctrl.deleteCategory);

module.exports=router;
