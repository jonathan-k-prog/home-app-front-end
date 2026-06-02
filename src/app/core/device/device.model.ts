import {Room} from '../room/room.model';
import {HumidityReport} from '../humidity-report/humidity-report.model';
import {TemperatureReport} from '../temperature-report/temperature-report.model';
import {DeviceType} from '../device-type/device-type.enum';

export interface Device {
  id: number;
  name: string;
  type: DeviceType;
  temperatureReports: HumidityReport[]
  humidityReports: TemperatureReport[]
  room: Room
}

export interface DeviceRequest {
  name: string;
  type: DeviceType;
  roomId: number;
}
