import bcryptjs from "bcryptjs";

export const hashPassword = (password) => {
  const salt = bcryptjs.genSaltSync(10);
  return bcryptjs.hashSync(password, salt);
};

export const verifyPassword = (password, hassPassword) => {
  return bcryptjs.compareSync(password, hassPassword);
};
