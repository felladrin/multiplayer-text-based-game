import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const westRoad: Room = new Room(
  "The West Road",
  `Duis varius metus eu magna laoreet pharetra. Curabitur fermentum 
  ligula a lorem eleifend dignissim id sit amet mauris. Nulla dictum vel dui 
  vel elementum. Maecenas quis odio mattis, lobortis urna rutrum, luctus leo. 
  Nullam leo mi, tristique non nisl eget, sodales laoreet tortor. Morbi 
  pulvinar ornare sapien vitae lacinia. Donec hendrerit, orci sed pharetra 
  dictum, lorem nisl congue purus, scelerisque feugiat ligula magna ac elit. 
  Donec posuere, diam ut vehicula auctor, nulla enim facilisis erat, sed 
  consequat quam ligula a quam.`,
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
