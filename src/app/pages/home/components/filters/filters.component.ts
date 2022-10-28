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
        <mat-panel-title
          >CATEGORIES</mat-panel-title
        ></mat-expansion-panel-header
      >
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let category of categories" [value]="category">
          <button (click)="onShowCategory(category)">{{ category }}</button>
        </mat-list-option>
      </mat-selection-list>
    </mat-expansion-panel>
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
