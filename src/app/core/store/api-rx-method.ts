import { patchState, WritableStateSource } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { MessageService } from 'primeng/api';
import { Observable, pipe, switchMap, tap, catchError, of } from 'rxjs';
import { ApiResponse } from '../api-response/api-response.model';

interface ToastTexts {
  successSummary: string;
  successDetail: string;
  errorSummary: string;
  fallbackError: string;
}

/*export function apiRxMethod<Input, Output, State extends object>(
  store: WritableStateSource<State>,
  messageService: MessageService,
  call: (input: Input) => Observable<ApiResponse<Output>>,
  patchLoading: (loading: boolean, error: string | null) => Partial<State>,
  patchSuccess: (data: Output) => Partial<State>,
  toasts: ToastTexts,
) {
  return rxMethod<Input>(pipe(
    tap(() => patchState(store, patchLoading(true, null))),
    switchMap(input => call(input).pipe(
      tap(({ data }) => {
        patchState(store, { ...patchLoading(false, null), ...patchSuccess(data) } as
          Partial<State>);
        messageService.add({ severity: 'success', summary: toasts.successSummary,
          detail: toasts.successDetail });
      }),
      catchError(error => {
        const message = error?.message ?? toasts.fallbackError;
        patchState(store, patchLoading(false, message));
        messageService.add({ severity: 'error', summary: toasts.errorSummary, detail:
          message });
        return of(null);
      }),
    )),
  ));
}*/

export function apiRxMethod<Input, Output, State extends object>(
  store: WritableStateSource<State>,
  messageService: MessageService,
  call: (input: Input) => Observable<ApiResponse<Output>>,
  patchLoading: (loading: boolean, error: string | null) => Partial<State>,
  patchSuccess: (data: Output) => Partial<State>,
  toasts: ToastTexts,
  guard?: () => string | null, // null = ok, sinon message affiché en popup
) {
  return rxMethod<Input>(pipe(
    switchMap(input => {
      const blocked = guard?.();
      if (blocked) {
        messageService.add({ severity: 'warn', summary: 'Action unavailable', detail: blocked });
        return of(null);
      }

      patchState(store, patchLoading(true, null));
      return call(input).pipe(
        tap(({ data }) => {
          patchState(store, { ...patchLoading(false, null), ...patchSuccess(data) } as
            Partial<State>);
          messageService.add({ severity: 'success', summary: toasts.successSummary, detail:
            toasts.successDetail });
        }),
        catchError(error => {
          const message = error?.message ?? toasts.fallbackError;
          patchState(store, patchLoading(false, message));
          messageService.add({ severity: 'error', summary: toasts.errorSummary, detail: message
          });
          return of(null);
        }),
      );
    }),
  ));
}
