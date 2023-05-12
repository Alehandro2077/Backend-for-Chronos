export default class UserDto {
  email;
  id;
  isActivated;

  constructor(data) {
    this.email = data.email;
    this.id = data._id;
    this.isActivated = data.activated;
  }
};
