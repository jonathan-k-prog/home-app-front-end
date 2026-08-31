import {RoomType} from '../room-type/room-type.enum';
import {Home} from '../home/home.model';

export interface Room {
  id: number;
  name: string;
  type: RoomType;
  width: number;
  height: number;
  x: number;
  y: number;
  floor: number;
  home: Home;
}

export interface RoomRequest {
  name: string;
  type: RoomType;
  width: number;
  height: number;
  x: number;
  y: number;
  floor: number;
  homeId: number;
}
