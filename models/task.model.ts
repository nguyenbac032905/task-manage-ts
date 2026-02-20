import mongoose from "mongoose";
const taskSchema = new mongoose.Schema({
    title: String,
    status: String,
    content: String,
    parent_id: String,
    timeStart: Date,
    createdBy: String,
    timeFinish: Date,
    listUser: Array,
    deleted:{
        type: Boolean,
        default: false
    },
    deletedAt: Date
},{
  //nếu set timestamps = true thì tự động thêm 2 thuộc tính createAt và deleteAt 
  timestamps:true
})
const Task =  mongoose.model("Task", taskSchema, "tasks");
export default Task;