const mongoose=require("mongoose");

module.exports=mongoose.model("Category",new mongoose.Schema({
 name:String,
 slug:String,
 image:String,
 status:{type:Boolean,default:true},
 on_home:{type:Boolean,default:false},
 is_top:{type:Boolean,default:false},
 is_best:{type:Boolean,default:false}
},{timestamps:true}));
