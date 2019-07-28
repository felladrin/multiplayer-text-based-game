import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const eastRoad: Room = new Room(
  "The East Road",
  "You're in the east road.",
  {
    East: null,
    North: null,
    Northeast: null,
    Northwest: null,
    South: null,
    Southeast: null,
    Southwest: null,
    West: cityCenter
  }
);

Rooms.register(eastRoad);
