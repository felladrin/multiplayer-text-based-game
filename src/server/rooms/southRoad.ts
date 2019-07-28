import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const southRoad: Room = new Room(
  "The South Road",
  `Maecenas pretium eros nec tempor dapibus. Vestibulum egestas 
  imperdiet dapibus. Nullam rhoncus sed mi et commodo. Proin fringilla 
  suscipit sem. Cras sagittis urna at sodales hendrerit. Aliquam id lectus 
  pretium, mollis nibh sit amet, vehicula felis. Etiam sed pellentesque 
  tellus. Vestibulum suscipit posuere elit, nec scelerisque urna tempor 
  placerat.`,
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
