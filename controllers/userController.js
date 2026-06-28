import connectDB from "../lib/mongoose.js";
import User from '../models/User.js';
import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

//register create a new user 
export const register=async(request)=>{
  await connectDB();
  try{
    const {name , email, password}= await request.json();
    const existingUser= await User.findOne({email});
    if(existingUser){
      return NextResponse.json(
        { error: 'User already exists' },
        { status: 400 }
      );
    }
    //if their is no one create a new user
    const user =new User({name,email,password});
    await user.save();
    return NextResponse.json(
      {message:'user created succesfully',user:{name:user.name,email:user.email}},{status:201}
    )
  }catch(error){
     return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
};
//login authenticater
export const login =async(request)=>{
  await connectDB();
  try{
    const {email,password}=await request.json();
    const user=await User.findOne({email});
    if(!user){
      return NextResponse.json(
        {error:'invalid credentials'},
        {status:401}
      );
    }
    //checking the password
    const isMatch=await user.comparePassword(password);
    if(!isMatch){
       return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }
    const token=jwt.sign(
      {id:user._id,email:user.email,name:user.name},
      process.env.JWT_SECRET,
      {expiresIn:'7d'}
    );
    return NextResponse.json({
      message:'login successful',
      token,
      user:{id:user, name: user.name, email: user.email}
    })
  }catch(error){
    console.error('Login error:', error.message);
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}