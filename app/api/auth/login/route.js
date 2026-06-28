import { login } from "../../../../controllers/userController";

export async function POST(request) {
  return login(request);
}