import { getNotes,createNote } from "../../../controllers/noteController";



export async function GET() {
return getNotes();
}
export async function POST(request) {
 return createNote(request); 
}