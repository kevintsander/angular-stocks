import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { StockService } from '../stock-service';
import { Stock } from '../stock-model';

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
                this.stock = stock;
            });
    }
}
