import mongoose from "mongoose";

const noteSchema= new mongoose.Schema({
  title:{
    type:String,
    require:true,
  },
  content: {
  type:String,
  require:true,
  },
  createdAt:{
    type:Date,
    default:Date.now
  }
})
export default mongoose.models.Note || mongoose.model('Note', noteSchema);