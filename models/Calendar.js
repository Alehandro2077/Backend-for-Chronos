import calendarBd from "../dbconf/calendar.js";
import tokenService from "../services/tokenService.js";
import userDb from "../dbconf/user.js";
import CalendarDto from "../dtos/calendarDtos.js";

class Calendar {
  async createCalendar(title, color, refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const calendar = await calendarBd.create({
      title: title,
      color: color,
      owner: userData.id,
    });
    const calendarData = new CalendarDto(calendar);
    return { calendar: calendarData };
  }

  async getCalendar(refreshToken) {
    const userData = tokenService.validateRefreshToken(refreshToken);
    const calendar = await calendarBd.find({ owner: userData.id });
    return calendar;
  }

  async deleteCalendar(id) {
    const calendarData = await calendarBd.deleteOne({ _id: id });
    return calendarData;
  }
}

export default new Calendar();
