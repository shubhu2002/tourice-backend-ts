import { compare, genSaltSync, hashSync } from "bcrypt";
export const GenerateHashPassword = async (password) => {
    try {
        const salt = genSaltSync(10);
        const hashedPass = hashSync(password, salt);
        return hashedPass;
    }
    catch (error) {
        throw error;
    }
};
export const CheckPassword = (password, hash_password) => {
    try {
        const result = compare(password, hash_password);
        return result;
    }
    catch (error) {
        throw error;
    }
};
