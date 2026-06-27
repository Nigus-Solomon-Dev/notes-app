import { NextResponse } from "next/server";
import connectDB from "../../../../lib/mongoose";
import Note from "../../../../models/Note";

export async function DELETE(request, { params }) {
  await connectDB();
  try {
    const { id } = await params;
    const deleteNote = await Note.findByIdAndDelete(id);
    if (!deleteNote) {
      return NextResponse.json({ error: 'note not found' }, { status: 404 });
    }
    return NextResponse.json({ message: 'Note deleted successfully' });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}