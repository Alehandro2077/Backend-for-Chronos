import jwt from "jsonwebtoken";
import tokenDb from "../dbconf/token.js";

class TokenService {
  generateToken(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCESS_SECRET, {
      expiresIn: "20m",
    });
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_SECRET, {
      expiresIn: "20d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET);
      return userData;
    } catch (err) {
      return null;
    }
  }

  async saveToken(userId, refreshToken) {
    const data = await tokenDb.findOne({ user: userId });
    if (data) {
      data.refreshToken = refreshToken;
      return data.save();
    } else {
      const token = await tokenDb.create({ user: userId, refreshToken });
      return token;
    }
  }

  async deleteToken(refreshToken) {
    const data = await tokenDb.deleteOne({ refreshToken });
    return data;
  }

  async getToken(refreshToken) {
    const data = await tokenDb.findOne({ refreshToken });
    return data;
  }
}

export default new TokenService();
