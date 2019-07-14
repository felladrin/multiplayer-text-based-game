import { Direction } from "../enum/Direction";

export type Room = {
  name: string;
  description: string;
  exits: Record<Direction, Room>;
};
