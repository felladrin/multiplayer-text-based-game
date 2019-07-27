import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";

export const cityCenter = new Room(
  "The City Center",
  "You're in the city center.",
  {
    East: null,
    North: null,
    Northeast: null,
    Northwest: null,
    South: null,
    Southeast: null,
    Southwest: null,
    West: null
  }
);

Rooms.register(cityCenter);
