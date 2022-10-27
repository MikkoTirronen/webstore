import { Component, OnInit,Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-products-header',
  template: `<mat-card class="mb-4">
    <div class="flex justify-between">
      <div>
        <button mat-button [mat-menu-trigger-for]="sortByMenu">
          Sort by {{ sort }}
          <mat-icon>expand_more</mat-icon>
        </button>
        <mat-menu #sortByMenu="matMenu">
          <button (click)="onSortUpdated('Descending')" mat-menu-item>
            Descending
          </button>
          <button (click)="onSortUpdated('Ascending')" mat-menu-item>
            Ascending
          </button>
        </mat-menu>
      </div>
      <div class="flex items-center">
        <div>
          <button class="mat-button" [mat-menu-trigger-for]="menu">
            Show {{ itemsShowCount }}
            <mat-icon>expand_more</mat-icon>
          </button>
          <mat-menu #menu="matMenu">
            <button (click)="onItemsUpdated(12)" mat-menu-item>12</button>
            <button (click)="onItemsUpdated(24)" mat-menu-item>24</button>
            <button (click)="onItemsUpdated(36)" mat-menu-item>36</button>
          </mat-menu>
          <button (click)="onColumnsUpdated(1)">
            <mat-icon>view_list</mat-icon></button
          ><button (click)="onColumnsUpdated(3)">
            <mat-icon>view_module</mat-icon></button
          ><button (click)="onColumnsUpdated(4)">
            <mat-icon>view_comfy</mat-icon>
          </button>
        </div>
      </div>
    </div>
  </mat-card> `,
})
export class ProductsHeaderComponent implements OnInit {
  @Output() columnsCountChange = new EventEmitter<number>();
  sort = 'Descending';
  itemsShowCount = 12;
  constructor() {}

  ngOnInit(): void {}
  onSortUpdated(newSort: string): void {
    this.sort = newSort;
  }
  onItemsUpdated(count: number): void {
    this.itemsShowCount = count;
  }
  onColumnsUpdated(colsNum: number): void {
    this.columnsCountChange.emit(colsNum);
  }
}
