import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { eastRoad } from "./eastRoad";
import { northRoad } from "./northRoad";
import { southRoad } from "./southRoad";
import { westRoad } from "./westRoad";

export const cityCenter: Room = new Room(
  "The City Center",
  "You're in the city center.",
  {
    East: eastRoad,
    North: northRoad,
    Northeast: null,
    Northwest: null,
    South: southRoad,
    Southeast: null,
    Southwest: null,
    West: westRoad
  }
);

Rooms.register(cityCenter);
