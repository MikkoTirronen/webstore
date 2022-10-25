import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products-header',
  templateUrl: './products-header.component.html',
  styleUrls: ['./products-header.component.css']
})
export class ProductsHeaderComponent implements OnInit {
  sort = 'Descending';
  constructor() { }

  ngOnInit(): void {
  }
  onSortUpdated(newSort: string): void{
    this.sort = newSort;
  }
}
