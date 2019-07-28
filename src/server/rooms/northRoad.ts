import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const northRoad: Room = new Room(
  "The North Road",
  "You're in the north road.",
  {
    East: null,
    North: null,
    Northeast: null,
    Northwest: null,
    South: cityCenter,
    Southeast: null,
    Southwest: null,
    West: null
  }
);

Rooms.register(northRoad);
