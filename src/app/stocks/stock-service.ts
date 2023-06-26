import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { environment } from '../../environments/environment';
import { Stock } from './stock-model'

const API_URL = "https://api.polygon.io/v2";

@Injectable({ providedIn: 'root' })
export class StockService {

  private stockResult = new Subject<Stock>();

  constructor(private http: HttpClient, private router: Router) { }

  onStockResult() {
    return this.stockResult.asObservable();
  }

  getStock(abbreviation: string) {
    const date = this.getLastDayString();
    console.log(date);
    this.http.get<{ stockResult: any }>(`${API_URL}/aggs/ticker/${abbreviation}/range/12/minute/${date}/${date}?adjusted=true&sort=asc&limit=5000&apiKey=${environment.polgygonStockApiKey}`)
      .pipe(
        map((stockResult: any) => {
          return {
            abbreviation: stockResult.ticker,
            date: date,
            price: stockResult.results.map((result: any) => {
              return {
                time: this.getTimeStringFromUnixTime(result.t),
                value: result.c
              };
            })
          }
        })
      )
      .subscribe(stock => {
        this.stockResult.next(stock);
      })
  }

  private getLastDayString(): string {
    const lastDay = this.getLastWorkingDay();
    var tzoffset = lastDay.getTimezoneOffset() * 60000; //offset in milliseconds
    return (new Date(lastDay.getTime() - tzoffset)).toISOString().slice(0, -1).split('T')[0];
  }

  private getLastWorkingDay(): Date {
    const lastWorkingDay = new Date();

    while (!this.isWorkingDay(lastWorkingDay)) {
      lastWorkingDay.setDate(lastWorkingDay.getDate() - 1)
    }
    console.log(lastWorkingDay.toISOString());
    return lastWorkingDay;
  }

  private isWorkingDay(date: Date) {
    const day = date.getDay();

    const isWeekday = (day > 0 && day < 6);

    return isWeekday; // && !isPublicHoliday?
  }

  private getTimeStringFromUnixTime(unixTime: number) {
    // Create a new JavaScript Date object based on the timestamp
    const date = new Date(unixTime);
    return date.toLocaleTimeString(navigator.language, { hour: '2-digit', minute: '2-digit' });
  }
}
