import userModel from "../models/User.js";
import { validationResult } from "express-validator";
import ApiError from "../errors/apiError.js";

class UserController {
  async reg(req, res, next) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return next(ApiError.BadRequest("Validation error", errors.array()));
      }
      const { email, password } = req.body;
      const userData = await userModel.reg(email, password);
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const userData = await userModel.login(email, password);
      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 30 * 24 * 60 * 60 * 1000,
        httpOnly: `true`,
      });
      return res.json(userData);
    } catch (err) {
      next(err);
    }
  }

  async logout(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      console.log(refreshToken);
      const token = await userModel.logout(refreshToken);
      res.clearCookie("refreshToken");
      return res.json(token);
    } catch (err) {
      next(err);
    }
  }


  async refresh(req, res, next) {
    try {
      const { refreshToken } = req.cookies;
      const data = await userModel.refresh(refreshToken);
       res.cookie("refreshToken", data.refreshToken, {
         maxAge: 30 * 24 * 60 * 60 * 1000,
         httpOnly: true,
       });
       return res.json(data);
    } catch (err) {
      next(err);
    }
  }


}

export default new UserController();