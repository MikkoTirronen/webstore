import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { CartService } from 'src/app/services/cart.service';
import { StoreService } from 'src/app/services/store.service';

const ROWS_HEIGHT: { [id: number]: number } = { 1: 400, 3: 335, 4: 350 };

@Component({
  selector: 'app-home',
  template: ` <mat-drawer-container
    [autosize]="true"
    class="min-h-full max-w-7x1 mx-auto border-x"
  >
    <mat-drawer mode="side" opened class="p-6">
      <app-filters (showCategory)="onShowCategory($event)"></app-filters>
    </mat-drawer>
    <mat-drawer-content class="p-6">
      <app-products-header
        (columnsCountChange)="onColumnsCountChange($event)"
      ></app-products-header>
      <mat-grid-list gutterSize="16" [cols]="cols" [rowHeight]="rowHeight">
        <mat-grid-tile *ngFor="let product of products">
          <app-product-box
            [product]="product"
            (addToCart)="onAddToCart($event)"
            class="w-full"
            [fullWidthMode]="cols === 1"
          >
          </app-product-box>
        </mat-grid-tile>
      </mat-grid-list>
    </mat-drawer-content>
  </mat-drawer-container>`,
})
export class HomeComponent implements OnInit, OnDestroy {
  constructor(
    private cartService: CartService,
    private storeService: StoreService
  ) {}

  cols = 3;
  category: string | undefined;
  rowHeight = ROWS_HEIGHT[this.cols];
  products: Array<Product> | undefined;
  sort = 'desc';
  count = '12';
  productsSubsciption: Subscription | undefined;

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
  }
  getProducts(): void {
    this.productsSubsciption = this.storeService
      .getAllProducts(this.count, this.sort)
      .subscribe((_products: Product[] | undefined) => {
        this.products = _products;
      });
  }
  ngOnInit(): void {
    this.getProducts();
  }
  ngOnDestroy(): void {
    if (this.productsSubsciption) {
      this.productsSubsciption.unsubscribe();
    }
  }
}
