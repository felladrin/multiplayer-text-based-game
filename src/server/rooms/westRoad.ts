import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const westRoad: Room = new Room(
  "The West Road",
  "You're in the west road.",
  {
    East: cityCenter,
    North: null,
    Northeast: null,
    Northwest: null,
    South: null,
    Southeast: null,
    Southwest: null,
    West: null
  }
);

Rooms.register(westRoad);
