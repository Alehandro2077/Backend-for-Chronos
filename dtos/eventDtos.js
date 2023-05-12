export default class EventDto {
  title;
  type;
  content;
  data_start;
  data_end;
  calendar;

  constructor(data) {
    this.title = data.title;
    this.type = data.type;
    this.content = data.content;
    this.data_start = data.data_start;
    this.data_end = data.data_end;
    this.calendar = data.calendar;
  }
};
