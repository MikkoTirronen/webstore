import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-filters',
  template: `
    <mat-expansion-panel *ngIf="categories">
      <mat-expansion-panel-header>
        <mat-panel-title>CATEGORIES</mat-panel-title>
      </mat-expansion-panel-header>
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let category of categories" [value]="category">
          <button (click)="onShowCategory(category)">{{ category }}</button>
        </mat-list-option>
      </mat-selection-list>
    </mat-expansion-panel>
    <div  class="flex justify-center pt-3">
      <button
        (click)="onShowCategory('')"
        type="button"
        class="mb-2 w-full inline-block px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-normal uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
      >
        Reset Categories</button
      >
  `,
})
export class FiltersComponent implements OnInit, OnDestroy {
  @Input() product: Product | undefined;
  @Output() showCategory = new EventEmitter<string>();
  categories: Array<string> | undefined = [];
  categoriesSubscription: Subscription | undefined;
  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.categoriesSubscription = this.storeService
      .getAllCategories()
      .subscribe((response) => {
        this.categories = response;
      });
  }
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
  ngOnDestroy(): void {
    if (this.categoriesSubscription) {
      this.categoriesSubscription.unsubscribe();
    }
  }
}
