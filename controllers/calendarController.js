import calendarModel from "../models/Calendar.js";
import tokenService from "../services/tokenService.js";

class CalendarController {

  async createCalendar(req, res, next) {
    try {
      const { title, color } = req.body;
      const refreshToken = req.cookies.refreshToken;
      const calendar = await calendarModel.createCalendar(
        title,
        color,
        refreshToken
      );
      return res.json(calendar);
    } catch (err) {
      console.log(err);
    }
  }

  async getCalendar(req, res, next) {
    try {
      const refreshToken = req.cookies.refreshToken;
      const calendar = await calendarModel.getCalendar(refreshToken);
      return res.json(calendar);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteCalendar(req, res, next) {
    try {
      const { id } = req.body;
      const refreshToken = req.cookies.refreshToken;
      const ttoken = tokenService.validateRefreshToken(refreshToken);
      if(!ttoken) return next();
      
      const calendarData = await calendarModel.deleteCalendar(id);
      return res.json(calendarData);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new CalendarController();
