import mongoose from "mongoose";
const connectDB=async ()=>{
  try{
    await mongoose.connect('mongodb://127.0.0.1:27017/notesdb');
    console.log('mongoDB Connected succesfuley');
    
  }catch(error){
    console.log('not coonected',error);
    process.exit(1);
    
  }
}
export default connectDB;