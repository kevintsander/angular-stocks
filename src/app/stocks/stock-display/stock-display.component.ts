import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService } from '../stock-service';
import { Stock } from '../stock-model';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-stock-display',
  templateUrl: './stock-display.component.html',
  styleUrls: ['./stock-display.component.scss']
})
export class StockDisplayComponent implements OnInit {
  stock: Stock | undefined;
  private stockResultSub = new Subscription();

  constructor(public stockService: StockService) { }

  ngOnInit() {
    this.stockResultSub = this.stockService.onStockResult()
      .subscribe((stock: Stock) => {
        this.setStockData(stock);
      });
  }

  private setStockData(stock: Stock) {
    this.stock = stock;
    this.lineChartData = {
      datasets: [
        {
          data: stock.price.map(price => price.value),
          label: 'Stock price',
          backgroundColor: 'rgba(148,159,177,0.2)',
          borderColor: 'rgba(148,159,177,1)',
          pointBackgroundColor: 'rgba(148,159,177,1)',
          pointBorderColor: '#fff',
          pointHoverBackgroundColor: '#fff',
          pointHoverBorderColor: 'rgba(148,159,177,0.8)',
          fill: 'origin'
        }
      ],
      labels: stock.price.map(price => price.time)
    }
  }

  public lineChartData: ChartConfiguration['data'] | undefined;
  public lineChartType: ChartType = 'line';


}
