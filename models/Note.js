import mongoose from "mongoose";

const noteSchema= new mongoose.Schema({
  title:{
    type:String,
    required:true,
    trim: true,
  },
  content: {
  type:String,
  required:true,
  trim: true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
export default mongoose.models.Note || mongoose.model('Note', noteSchema);