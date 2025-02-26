import bcrypt from "bcryptjs";

const comparePassword = async (password, hash) => {
  return await bcrypt.compare(password, hash);
};

export default comparePassword;
