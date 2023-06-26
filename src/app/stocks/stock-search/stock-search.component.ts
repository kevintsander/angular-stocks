import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms'
import { StockService } from '../stock-service';

@Component({
  selector: 'app-stock-search',
  templateUrl: './stock-search.component.html',
  styleUrls: ['./stock-search.component.scss']
})
export class StockSearchComponent {
  searchForm = new FormGroup({
    search: new FormControl('')
  });

  constructor(public stockService: StockService) { }

  onSearch() {
    const searchAbbreviation = this.searchForm.value.search;
    if (searchAbbreviation) {
      console.log(this.searchForm.value.search);
      this.stockService.getStock(searchAbbreviation);
    }
  }
}
