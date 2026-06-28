import { deletedNote,updatedNote } from "../../../../controllers/noteController.js";

export async function DELETE(request, { params }) {
  return deletedNote(request, { params });
}
export async function PUT(request, { params }) {
  return updatedNote(request, { params });
}