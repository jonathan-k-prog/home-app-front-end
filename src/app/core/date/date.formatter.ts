import {Injectable} from '@angular/core';

@Injectable({ providedIn: 'root' })
export class DateFormatter {
  toStringForChart(timestamp: number) {
    const d = new Date(timestamp);

    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");

    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mi = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");

    return `${yyyy}/${mm}/${dd} -- ${hh}:${mi}:${ss}`;
  }

  toString(timestamp: number | undefined | null) {
    if (timestamp == null) {
      return '-';
    }

    const d = new Date(timestamp);

    const yyyy = d.getUTCFullYear();
    const mm = String(d.getUTCMonth() + 1).padStart(2, "0");
    const dd = String(d.getUTCDate()).padStart(2, "0");

    const hh = String(d.getUTCHours()).padStart(2, "0");
    const mi = String(d.getUTCMinutes()).padStart(2, "0");
    const ss = String(d.getUTCSeconds()).padStart(2, "0");

    return `${yyyy}/${mm}/${dd} -- ${hh}:${mi}:${ss}`;
  }
}
