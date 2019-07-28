import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const northRoad: Room = new Room(
  "The North Road",
  `Quisque condimentum eros quam, vel pulvinar eros condimentum 
  consectetur. Mauris non aliquet leo. Mauris in condimentum odio, sit amet 
  dictum nisl. Integer hendrerit cursus nisl, id vulputate neque laoreet sed. 
  In hac habitasse platea dictumst. Cras eu luctus arcu. Sed mattis blandit 
  orci in ullamcorper. Donec et turpis semper, eleifend tortor eget, tincidunt 
  ligula. Etiam dignissim sit amet nunc sed feugiat. Praesent vel felis 
  posuere, facilisis turpis sed, dignissim nisl.`,
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
