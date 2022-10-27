import { Component, Input, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-header',
  template: `<mat-toolbar class="max-w-7x1 mx-auto border-x justify-between">
    <a routerLink="home">Welcome to My Store!</a>
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon [matBadge]="itemsQuantity" [matBadgeHidden]="!itemsQuantity"
        >shopping_cart</mat-icon
      >
    </button>
    <mat-menu #menu="matMenu">
      <div class="p-4 divide-y divide-solid">
        <div class="pb-3 flex justify-between">
          <a routerLink="/cart">View Cart</a>
        </div>
        <div *ngIf="cart.items.length" class="py-3">
          <div
            *ngFor="let item of cart.items"
            class="flex justify-between font-light mb-2 pl-3"
          >
            {{ item.name }} x{{ item.quantity }}
            <span class="font-bold px-3">{{ item.price | currency }}</span>
          </div>
        </div>
        <div class="text-right pb-3 py-3">
          Total:
          <span class="font-bold px-3">{{
            getTotal(cart.items) | currency
          }}</span>
        </div>
        <div class="pt-6 flex justify-between">
          <button
            (click)="onClearCart()"
            class="bg-rose-800 text-white rounded-full w-9 h-9"
          >
            <mat-icon>remove_shopping_cart</mat-icon>
          </button>
          <button
            routerLink="/cart"
            class="bg-green-600 text-white rounded-full w-9 h-9"
          >
            <mat-icon>shopping_cart</mat-icon>
          </button>
        </div>
      </div>
    </mat-menu>
  </mat-toolbar> `,
})
export class HeaderComponent implements OnInit {
  constructor(private cartService: CartService) {}

  private _cart: Cart = { items: [] };
  itemsQuantity = 0;

  @Input() get cart(): Cart {
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item: { quantity: number }) => item.quantity)
      .reduce((prev: number, current: number) => prev + current, 0);
  }
  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items);
  }
  onClearCart() {
    this.cartService.clearCart();
  }
  ngOnInit(): void {}
}
