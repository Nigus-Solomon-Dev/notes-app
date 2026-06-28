import { register } from '../../../../controllers/userController.js';

export async function POST(request){
  return register(request);
}