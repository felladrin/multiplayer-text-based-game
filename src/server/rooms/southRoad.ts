import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const southRoad: Room = new Room(
  "The South Road",
  "You're in the south road.",
  {
    East: null,
    North: cityCenter,
    Northeast: null,
    Northwest: null,
    South: null,
    Southeast: null,
    Southwest: null,
    West: null
  }
);

Rooms.register(southRoad);
