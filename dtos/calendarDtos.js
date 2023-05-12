export default class CalendarDto {
  title;
  owner;

  constructor(data) {
    this.title = data.title;
    this.owner = data.owner;
  }
};
