import {Room} from '../room/room.model';
import {HumidityReport} from '../humidity-report/humidity-report.model';
import {TemperatureReport} from '../temperature-report/temperature-report.model';
import {DeviceType} from '../device-type/device-type.enum';

export interface Device {
  id: number;
  name: string;
  identifier: string;
  type: DeviceType;
  connected: boolean;
  lastSeen: number;

  averageTemperature: number;
  minTemperatureReport: TemperatureReport | null;
  maxTemperatureReport: TemperatureReport | null;
  lastTemperatureReport: TemperatureReport | null;

  averageHumidity: number;
  minHumidityReport: HumidityReport | null;
  maxHumidityReport: HumidityReport | null;
  lastHumidityReport: HumidityReport | null;
  room: Room
}

export interface DeviceRequest {
  name: string;
  identifier: string;
  type: DeviceType;
  connected: boolean;
  lastSeen: number;
  roomId: number;
}
