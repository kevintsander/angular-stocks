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
    const date = new Date().toISOString().split('T')[0];
    this.http.get<{ stockResult: any }>(`${API_URL}/aggs/ticker/${abbreviation}/range/12/minute/${date}/${date}?adjusted=true&sort=asc&limit=120&apiKey=${environment.polgygonStockApiKey}`)
      .pipe(
        map((stockResult: any) => {
          return {
            abbreviation: stockResult.ticker,
            price: stockResult.results.map((result: any) => {
              return {
                time: result.t,
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
}
