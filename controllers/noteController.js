
import connectDB from "../lib/mongoose.js"
import Note from '../models/Note.js';
import { NextResponse } from 'next/server';

//getting notes
export const getNotes=async ()=>{
  await connectDB();
  try{
    const notes= await Note.find().sort({createdAt:-1});
    return NextResponse.json(notes);
  }catch (error){
    return NextResponse.json({error:error.message
    },{status:500})
  }
}
//for create note
export const createNote=async (request)=>{
  await connectDB();
  try{
     const {title,content}=await request.json();
     if (!title||!content){
      return NextResponse.json({error:'title and content are requiered'},{status:400})
     }
     const newNote=new Note({title,content});
     await newNote.save();
     return NextResponse.json(
      {message:'note created',note:newNote},
      {status:201}
     )
  }catch (error){
    return NextResponse.json(
      {error:error.message},
      {status:400}
    )
  }
}
//updating note
export const updatedNote=async (request,{params})=>{
  await connectDB();
  try{
    const {id}=await params;
    const {title,content}=await request.json();
    if(!title||!content){
      return NextResponse.json({error:'title and content are requiered'},{status:400})
    }
    const updatedNote=await Note.findByIdAndUpdate(
      id,
      {title,content},
      {new:true}
    );
    if (!updatedNote){
      return NextResponse.json(
        {error:'Note not found'},
        {status:404}
      )
    }
   return NextResponse.json({
      message: 'Note updated!',
      note: updatedNote
    });
  }catch(error){
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}
export const deletedNote=async (request,{params})=>{
  await connectDB();
  try{
    const {id}=await params;
    const deletedNote=await Note.findByIdAndDelete(id)
    if (!deletedNote) {
      return NextResponse.json(
        { error: 'Note not found' },
        { status: 404 }
      );  
  }
  return NextResponse.json({
      message: 'Note deleted successfully'
    });
} catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
};