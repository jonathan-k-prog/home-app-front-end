import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { MessageService } from 'primeng/api';
import {apiRxMethod} from '../../core/store/api-rx-method';
import {Device} from '../../core/device/device.model';
import {CommandApi} from '../../core/command/command.api';
import {CommandRequestType} from '../../core/command-type/command-type.model';

interface DevicesManagerState {
  error: string | null;
}

const initialState: DevicesManagerState = {
  error: null
};

export const DevicesManagerStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((
    store,
    commandApi = inject(CommandApi),
    messageService = inject(MessageService)) => ({

    commandDevice: apiRxMethod<{ device: Device, action: string }, null, DevicesManagerState>(
      store, messageService,
      (command) => commandApi.send({
        targetType: CommandRequestType.DEVICE,
        targetId: command.device.id,
        action: command.action,
      }),
      (loadingDevices, error) => ({ loadingDevices, error }),
      () => ({}),
      {
        successSummary: 'Command Successful', successDetail: 'Device has been commanded successfully.',
        errorSummary: 'Command Failed', fallbackError: 'Device commanding failed'
      },
    ),

    reset() { patchState(store, initialState); },
  })),
);
