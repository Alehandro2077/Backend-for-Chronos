import userDB from "../dbconf/user.js";
import * as uuid from "uuid";
import bcrypt from "bcrypt";
import tokenService from "../services/tokenService.js";
import UserDto from "../dtos/userDtos.js";
import ApiError from "../errors/apiError.js";

class User {
  async reg(email, password) {
    const isExist = await userDB.findOne({ email });
    if (isExist) {
      throw ApiError.BadRequest("User already exist");
    }
    const hashPassw = await bcrypt.hash(password, 3);
    const activationLink = uuid.v4();

    const user = await userDB.create({
      email: email,
      password: hashPassw,
      activated: true,
      activationLink: activationLink,
    });

    const userDto = new UserDto(user);
    return userDto;
  }

  

  async login(email, password) {
    const user = await userDB.findOne({ email });
    if (!user) {
      throw ApiError.BadRequest("Invalid login");
    }
    const checkPassw = await bcrypt.compare(password, user.password);
    if (!checkPassw) {
      throw ApiError.BadRequest("Invalid password");
    }
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async logout(refreshToken) {
    const token = await tokenService.deleteToken(refreshToken);
    return token;
  }

  async refresh(refreshToken) {
    if (!refreshToken) {
      throw ApiError.UnathorizedError();
    }
    const userData = tokenService.validateRefreshToken(refreshToken);
    const tokenFromDB = await tokenService.getToken(refreshToken);
    if (!userData || !tokenFromDB) {
      throw ApiError.UnathorizedError();
    }
    const user = await userDB.findById(userData.id);
    const userDto = new UserDto(user);
    const tokens = tokenService.generateToken({ ...userDto });

    await tokenService.saveToken(userDto.id, tokens.refreshToken);
    return { ...tokens, user: userDto };
  }

  async getUsers() {
    const users = await userDB.find();
    return users;
  }

  async getOneUser(opt) {
    const user = await findOne(opt);
    const userDto = new UserDto(user);
    return userDto;
  }
}

export default new User();
