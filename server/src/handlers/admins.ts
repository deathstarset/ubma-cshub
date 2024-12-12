import { NextFunction, Request, Response } from "express-serve-static-core";
import { addUser, editUser, findUserByID, removeUser } from "../services/users";
import { findAdmins } from "../services/admins";
import { asyncWrapper } from "../middlewares/async";
import { StatusCodes } from "http-status-codes";
import { hashPassword } from "../utils/password";
import { NotFoundError } from "../errors/errors";

interface CreateAdminRequestBody {
  username: string;
  password: string;
  email: string;
}
export const createAdmin = asyncWrapper(
  async (
    req: Request<{}, {}, CreateAdminRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { username, email, password } = req.body;

    const hashedPassword = await hashPassword(password);

    const user = await addUser({
      username,
      email,
      password: hashedPassword,
      role: "ADMIN",
    });
    res.status(StatusCodes.CREATED).json({ user });
  }
);

export const getAdmin = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const admin = await findUserByID(id);
    if (!admin) {
      return next(new NotFoundError("Admin not found"));
    }
    res.status(StatusCodes.OK).json({ admin });
  }
);

export const getAdmins = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const admins = await findAdmins();
    res.status(StatusCodes.OK).json({ admins });
  }
);

export const deleteAdmin = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, {}>,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;
    const admin = await findUserByID(id);
    if (!admin) {
      return next(new NotFoundError("Admin not found"));
    }
    const deletedAdmin = await removeUser(id);
    res.status(StatusCodes.OK).json({ deletedAdmin });
  }
);

interface UpdateAdminRequestBody {
  username?: string;
  email?: string;
}
export const updateAdmin = asyncWrapper(
  async (
    req: Request<{ id: string }, {}, UpdateAdminRequestBody>,
    res: Response,
    next: NextFunction
  ) => {
    const { email, username } = req.body;
    const { id } = req.params;
    const admin = await editUser(id, {
      email,
      username,
      role: "ADMIN",
    });
    res.status(StatusCodes.OK).json({ admin });
  }
);
