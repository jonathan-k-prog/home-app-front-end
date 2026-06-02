import {AuthEffects} from './features/auth/store/auth.effects';
import {AuthReducer} from './features/auth/store/auth.reducer';
import {DeviceTrackerEffects} from './features/device-tracker/store/device-tracker.effects';
import {DeviceTrackerReducer} from './features/device-tracker/store/device-tracker.reducer';
import {DevicesManagerEffects} from './features/devices-manager/store/devices-manager.effects';
import {DevicesManagerReducer} from './features/devices-manager/store/devices-manager.reducer';
import {HomeEffects} from './features/home/store/home.effects';
import {HomeReducer} from './features/home/store/home.reducer';
import {RoomsManagerEffects} from './features/rooms-manager/store/rooms-manager.effects';
import {RoomsManagerReducer} from './features/rooms-manager/store/rooms-manager.reducer';
import {RoomTrackerEffects} from './features/room-tracker/store/room-tracker.effects';
import {RoomTrackerReducer} from './features/room-tracker/store/room-tracker.reducer';
import {WeatherEffects} from './features/weather/store/weather.effects';
import {WeatherReducer} from './features/weather/store/weather.reducer';

export const rootReducers = {
  auth: AuthReducer,
  deviceTracker: DeviceTrackerReducer,
  devicesManager: DevicesManagerReducer,
  home: HomeReducer,
  roomTracker: RoomTrackerReducer,
  roomsManager: RoomsManagerReducer,
  weather: WeatherReducer,
};

export const rootEffects = [
  AuthEffects,
  DeviceTrackerEffects,
  DevicesManagerEffects,
  HomeEffects,
  RoomTrackerEffects,
  RoomsManagerEffects,
  WeatherEffects
];
