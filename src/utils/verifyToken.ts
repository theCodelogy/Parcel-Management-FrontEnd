import { jwtDecode } from "jwt-decode";
type TUser= {
    name:string;
    email:string;
    role:string;
    phone:string;
  }

export const verifyToken =(token:string):TUser=>{
    return jwtDecode(token);
}