import eventDb from "../dbconf/event.js";
import tokenService from "../services/tokenService.js";
import EventDto from "../dtos/eventDtos.js";
import calendarDb from "../dbconf/calendar.js";

class Event {
  async createEvent(
    title,
    type,
    content,
    data_start,
    data_end,
    calendar_t,
    refreshToken
  ) {
    const owner = tokenService.validateRefreshToken(refreshToken);

    console.log("owner: ", owner);
    console.log("calendar_t: ", calendar_t);

    const calendar_inf = await calendarDb.findOne({
      title: calendar_t,
      owner: owner.id,
    });

    const event = await eventDb.create({
      title: title,
      type: type,
      content: content,
      data_start: data_start,
      data_end: data_end,
      calendar: calendar_inf._id,
    });
    const eventDto = new EventDto(event);
    return { event: eventDto };
  }

  async deleteEvent(title, calendar) {
    console.log("title: ", title);
    console.log("calendar: ", calendar);
    
    const eData = await eventDb.findOne({title: title, calendar: calendar});
    const id = eData.id;
    console.log("id: ", id);
    const event = await eventDb.deleteOne({ _id: id });
    return event;
  }

  async getEvents(title, refreshToken) {
    const owner = tokenService.validateRefreshToken(refreshToken);
    const calendar = await calendarDb.findOne({
      title: title,
      owner: owner.id,
    });
    const events = await eventDb.find({ calendar: calendar._id });
    return events;
  }

  async updateEvent(title, type, content, id) {
    if (title) {
      await eventDb.updateOne({ _id: id }, { title: title });
    }
    if (type) {
      await eventDb.updateOne({ _id: id }, { type: type });
    }
    if (content) {
      await eventDb.updateOne({ _id: id }, { content: content });
    }
    return;
  }
}

export default new Event();
