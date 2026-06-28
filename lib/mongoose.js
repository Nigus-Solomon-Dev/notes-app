import 'dotenv/config';
import mongoose from "mongoose";
const connectDB=async ()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('mongoDB Connected succesfuley');
    
  }catch(error){
    console.log('not coonected',error);
    process.exit(1);
    
  }
}
export default connectDB;