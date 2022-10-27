import { Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import { Product } from 'src/app/models/product.model';


@Component({
  selector: 'app-product-box',
  template: `
  <mat-card [ngClass]="{ 'text-center': !fullWidthMode }">
    <div [ngClass]="{ flex: fullWidthMode }">
      <img
        src="https://via.placeholder.com/150"
        alt="placeholder"
        class="mb-1 mx-auto h-[200px]"
        [ngClass]="{ 'h-200px': !fullWidthMode, 'h-[360px]': fullWidthMode }"
      />
      <div
        class="w-full"
        [ngClass]="{ 'px-8 flex flex-col justify-between': fullWidthMode }"
      >
        <div>
          <h5>Shoes</h5>
          <p class="truncate hover:whitespace-normal">Snickers</p>
          <p *ngIf="fullWidthMode">Description</p>
        </div>
        <div class="flex justify-between">
          <span class="text-red-400">{{ '150' | currency }} </span
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
  product: Product | undefined = {
    id: 1,
    title: 'Sneakers',
    category: 'Shoes',
    price: 150,
    description: 'Some Fancy Pantsy Kicks!',
    image: 'https://via.placeholder.com/150',
  };
  @Output() addToCart = new EventEmitter();

  onAddToCart(): void {
    this.addToCart.emit(this.product);
  }
  ngOnInit(): void {}
}
