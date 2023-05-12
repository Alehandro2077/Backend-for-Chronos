import { Router } from "express";
import userController from "./controllers/userController.js";
import { body } from "express-validator";
import calendarController from "./controllers/calendarController.js";
import eventController from "./controllers/eventController.js";

const router = new Router();

router.post(
  "/reg",
  body("email").isEmail(),
  body("password").isLength({ min: 3, max: 24 }),
  userController.reg
);
router.post("/login", userController.login);

router.post("/logout", userController.logout);


router.get("/refresh", userController.refresh);

router.post("/createCalendar", calendarController.createCalendar);

router.get("/getCalendar", calendarController.getCalendar);

router.delete("/deleteCalendar", calendarController.deleteCalendar);

router.post("/createEvent", eventController.createEvent);

router.get("/getEvent", eventController.getEvents);

router.delete("/deleteEvent", eventController.deleteEvent);

router.post("/updateEvent", eventController.updateEvent);


export default router;