import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { eastRoad } from "./eastRoad";
import { northRoad } from "./northRoad";
import { southRoad } from "./southRoad";
import { westRoad } from "./westRoad";

export const cityCenter: Room = new Room(
  "The City Center",
  `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ac
  euismod sapien. Pellentesque non eleifend leo. Praesent malesuada, nunc vitae
  elementum ultricies, urna quam fringilla est, nec cursus quam velit nec
  tellus. Suspendisse sollicitudin, nunc sit amet vehicula rhoncus, nisl
  lorem sollicitudin ligula, in mattis turpis metus id enim. Nulla ut dapibus
  erat. Mauris justo massa, cursus in imperdiet at, iaculis sit amet massa.
  Suspendisse suscipit eget magna sed cursus. Praesent a gravida est. Donec ac
  accumsan nibh, eu auctor risus. Suspendisse lacinia consequat diam, eget
  hendrerit leo pharetra quis. Phasellus vitae nisl dignissim, mattis diam et,
  vehicula arcu. Sed quis massa sit amet libero dignissim laoreet vel a sapien.
  Cras at massa orci. Pellentesque sit amet augue eros. Curabitur tristique
  vitae purus id dapibus. Nullam feugiat scelerisque nibh, sed tincidunt
  ante viverra et.`,
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
