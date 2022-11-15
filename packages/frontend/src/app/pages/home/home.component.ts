import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cart, CartItem } from 'src/app/models/cart.model';
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
        (itemsCountChange)="onItemsCountChange($event)"
        (sortChange)="onSortChange($event)"
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
  productsSubscription: Subscription | undefined;

  onColumnsCountChange(colsNum: number): void {
    this.cols = colsNum;
    this.rowHeight = ROWS_HEIGHT[this.cols];
  }
  onShowCategory(newCategory: string): void {
    this.category = newCategory;
    this.getProducts();
  }
  onAddToCart(product: Product): void {
    this.cartService.addToCart({
      product: product.image,
      name: product.title,
      price: product.price,
      quantity: 1,
      id: product.id,
    });
    this.updateCartInfo();
  }
  getProducts(): void {
    this.productsSubscription = this.storeService
      .getAllProducts(this.count, this.sort, this.category)
      .subscribe((_products: Product[] | undefined) => {
        this.products = _products;
      });
  }
  getCartInfo() {
    const data = this.cartService.getTempCartData().subscribe((res) => {
      let mydata = JSON.parse(JSON.stringify(res));
      mydata.map((item: CartItem) => {
        this.cartService.addToCart(item);
      });
    });
  }
  updateCartInfo() {
    const data = this.cartService.updateTempCart().subscribe((res) => {
      console.log(res);
    });
  }
  onItemsCountChange(newCount: number): void {
    this.count = newCount.toString();
    this.getProducts();
  }

  onSortChange(newSort: string): void {
    this.sort = newSort;
    this.getProducts();
  }

  ngOnInit(): void {
    this.getProducts();
    this.getCartInfo();
  }
  ngOnDestroy(): void {
    if (this.productsSubscription) {
      this.productsSubscription.unsubscribe();
    }
  }
}
