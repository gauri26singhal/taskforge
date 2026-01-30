
const router = require("express").Router();
const Task = require("../models/Task");
const auth = require("../middleware/auth");

router.post("/",auth,async(req,res)=>{
  const task = await Task.create({...req.body,userId:req.userId});
  res.json(task);
});

router.get("/",auth,async(req,res)=>{
  const tasks = await Task.find({userId:req.userId});
  res.json(tasks);
});

router.put("/:id",auth,async(req,res)=>{
  await Task.findByIdAndUpdate(req.params.id,req.body);
  res.json("Updated");
});

router.delete("/:id",auth,async(req,res)=>{
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;
