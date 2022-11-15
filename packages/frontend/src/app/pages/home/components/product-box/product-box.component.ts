import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-product-box',
  template: `
    <mat-card *ngIf="product" [ngClass]="{ 'text-center': !fullWidthMode }">
      <div [ngClass]="{ flex: fullWidthMode }">
        <img
          [src]="product.image"
          alt="product.title"
          class="mb-1 mx-auto h-[200px]"
          [ngClass]="{ 'h-200px': !fullWidthMode, 'h-[360px]': fullWidthMode }"
        />
        <div
          class="w-full"
          [ngClass]="{ 'px-8 flex flex-col justify-between': fullWidthMode }"
        >
          <div>
            <h5>{{ product.category }}</h5>
            <p class="truncate hover:whitespace-normal">{{product.title}}</p>
            <p *ngIf="fullWidthMode">{{product.description}}</p>
          </div>
          <div class="flex justify-between">
            <span class="text-red-400">{{ product.price | currency }} </span
            ><button (click)="onAddToCart()">
              <mat-icon class="text-gray-500">shopping_cart</mat-icon>
            </button>
          </div>
        </div>
      </div>
    </mat-card>
  `,
})
export class ProductBoxComponent implements OnInit {
  constructor() {}
  @Input() fullWidthMode = false;
  @Input() product: Product | undefined;
  @Output() addToCart = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
  ngOnInit(): void {}
}
