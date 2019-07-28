import { Room } from "../../shared/classes/rooms/Room";
import { Rooms } from "../../shared/classes/rooms/Rooms";
import { cityCenter } from "./cityCenter";

export const eastRoad: Room = new Room(
  "The East Road",
  `Nulla gravida magna in quam mattis rutrum. Sed consequat fermentum 
  tristique. Etiam ultrices velit sed ex tempor accumsan. Donec hendrerit eros 
  quis eros tincidunt efficitur. In hac habitasse platea dictumst. Maecenas 
  nunc magna, malesuada quis mattis vel, fringilla et justo. Morbi pellentesque 
  viverra justo quis tincidunt. Cras auctor tortor sit amet nunc pretium 
  pretium. Fusce aliquam sapien ut mauris auctor, non viverra ex dapibus. 
  Cras porttitor elit id neque cursus, vel volutpat magna pharetra. 
  In eleifend finibus nisi, id suscipit nisl mattis id. Quisque nec lorem at 
  risus sodales faucibus. Aliquam tincidunt imperdiet arcu sit amet euismod. 
  Cras dignissim sem nec est rhoncus hendrerit. Curabitur et dapibus ligula. 
  Donec laoreet, nulla luctus tincidunt facilisis, nibh nibh tristique elit, 
  a dictum ex turpis eu lorem.`,
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
