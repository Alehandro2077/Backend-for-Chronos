import eventModel from "../models/Event.js";

class EventController {

  async createEvent(req, res, next) {
    try {
      const { title, type, content, data_start, data_end, calendar } = req.body;
      const refreshToken = req.cookies.refreshToken;
      const event = await eventModel.createEvent(
        title,
        type,
        content,
        data_start,
        data_end,
        calendar,
        refreshToken
      );
      return res.json(event);
    } catch (err) {
      console.log(err);
    }
  }

  async getEvents(req, res, next) {
    try {
      const { title } = req.body;
      const refreshToken = req.cookies.refreshToken;
      const events = await eventModel.getEvents(title, refreshToken);
      return res.json(events);
    } catch (err) {
      console.log(err);
    }
  }

  async deleteEvent(req, res, next) {
    try {
      const { title, calendar } = req.body;
      const event = await eventModel.deleteEvent(
        title,
        calendar
      );
      return res.json(event);
    } catch (err) {
      console.log(err);
    }
  }

  async updateEvent(req, res, next) {
    try {
      const { title, type, content, id } = req.body;
      const updateData = await eventModel.updateEvent(
        title,
        type,
        content,
        id,
      );
      return res.json(updateData);
    } catch (err) {
      console.log(err);
    }
  }
}

export default new EventController();