import { compare, genSaltSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";

export const GenerateHashPassword = async (
  password: string,
): Promise<string> => {
  try {
    const salt = genSaltSync(10);
    const hashedPass = hashSync(password, salt);
    return hashedPass;
  } catch (error: any) {
    throw error;
  }
};

export const CheckPassword = (
  password: string,
  hash_password: string,
): Promise<boolean> => {
  try {
    const result = compare(password, hash_password);
    return result;
  } catch (error: any) {
    throw error;
  }
};
