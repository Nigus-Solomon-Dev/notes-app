import mongoose from "mongoose";
import bcrypt from 'bcryptjs';



const userSchema =new mongoose.Schema({
  name:{
    type:String,
    required:[true,'name is required'],
    trim:true
  },
  email:{
    type:String,
    required:[true,'name is required'],
    trim:true,
     unique: true,
    lowercase: true,
    match: [/.+\@.+\..+/, 'Please enter a valid email']
  },
  password:{
    type: String,
    required: [true, 'Password is required'],
    minlength: [6, 'Password must be at least 6 characters']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
// hash password before saving
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

//compare password ,method
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export default mongoose.models.User||mongoose.model('User',userSchema);