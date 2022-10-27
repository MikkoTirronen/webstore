import { outputAst } from '@angular/compiler';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-filters',
  template: `
    <mat-expansion-panel *ngIf="categories">
      <mat-expansion-panel-header>
        <mat-panel-title>CATEGORIES</mat-panel-title></mat-expansion-panel-header
      >
      <mat-selection-list [multiple]="false">
        <mat-list-option *ngFor="let category of categories" [value]="category">
          <button (click)="onShowCategory(category)">{{ category }}</button>
        </mat-list-option>
      </mat-selection-list>
    </mat-expansion-panel>
  `
})
export class FiltersComponent implements OnInit {
  @Output() showCategory = new EventEmitter<string>();
  categories = ['shoes', 'sports'];
  constructor() {}

  ngOnInit(): void {}
  onShowCategory(category: string): void {
    this.showCategory.emit(category);
  }
}
