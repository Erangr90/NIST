import { Request } from "express"
import IUser from "../interfaces/IUser"

type AuthRequest = Request & {
  user: IUser
}

export default AuthRequest
