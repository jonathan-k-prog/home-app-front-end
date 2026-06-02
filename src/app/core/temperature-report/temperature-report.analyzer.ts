import {Injectable} from '@angular/core';
import {TemperatureReport} from './temperature-report.model';

@Injectable({ providedIn: 'root' })
export class TemperatureReportAnalyzer {
  getMean(reports: TemperatureReport[]): number | null {
    if (reports.length === 0) {
      return null;
    }

    const total = reports.reduce((sum, report) => sum + report.value, 0);
    return total / reports.length;
  }

  getMedian(reports: TemperatureReport[]): number | null {
    if (reports.length === 0) {
      return null;
    }

    const sortedValues = reports
      .map((report) => report.value)
      .sort((left, right) => left - right);
    const middleIndex = Math.floor(sortedValues.length / 2);

    if (sortedValues.length % 2 === 0) {
      return (sortedValues[middleIndex - 1] + sortedValues[middleIndex]) / 2;
    }

    return sortedValues[middleIndex];
  }

  getMax(reports: TemperatureReport[]): number | null {
    if (reports.length === 0) {
      return null;
    }

    return reports.reduce((max, report) => Math.max(max, report.value), reports[0].value);
  }

  getMin(reports: TemperatureReport[]): number | null {
    if (reports.length === 0) {
      return null;
    }

    return reports.reduce((min, report) => Math.min(min, report.value), reports[0].value);
  }
}
