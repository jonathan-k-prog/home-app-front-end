import {RoomType} from '../room-type/room-type.enum';

export interface Room {
  id: number;
  name: string;
  type: RoomType;
}

export interface RoomRequest {
  name: string;
  type: RoomType;
}
