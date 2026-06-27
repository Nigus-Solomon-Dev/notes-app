import { NextResponse } from "next/server";
import connectDB from "../../../lib/mongoose.js";
import Note from "../../../models/Note.js";

export async function GET() {
  await connectDB();
  try{
    const notes=await Note.find().sort({createdAt:-1});
    return NextResponse.json(notes);
  }catch(error){
    return NextResponse.json({error:error.message},{status:500})
  }
  
}
export async function POST(request) {
  await connectDB();
  try{
    const {title,content}=await request.json();
    const newNote=new Note({
      title:title,
      content: content,
    });
    await newNote.save();
    return NextResponse.json(
      {message:'note created',note:newNote},
      {status:201}
    )
  }catch(error){
    return NextResponse.json(
      {error:error.message},
      {status:400}
    )
  }
  
}