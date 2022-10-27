import { Component, Input, OnInit } from '@angular/core';
import { Cart } from 'src/app/models/cart.model';

@Component({
  selector: 'app-header',
  template: `<mat-toolbar class="max-w-7x1 mx-auto border-x justify-between">
    <a routerLink="home">Welcome to My Store!</a>
    <button mat-icon-button [matMenuTriggerFor]="menu">
      <mat-icon [matBadge]="1">shopping_cart</mat-icon>
    </button>
    <mat-menu #menu="matMenu">
      <div class="p-3 divide-y divide-solid">
        <div class="pb-3 flex justify-between">
          <span class="mr-16">1 items</span>
          <a routerLink="cart">View Cart</a>
        </div>
        <div class="py-3">
          <div class="flex justify-between font-light mb-2">
            keyboard x 1 <span class="font-bold">{{ '150' | currency }}</span>
          </div>
          <div class="flex justify-between font-light mb-2">
            keyboard x 1<span class="font-bold">{{ '150' | currency }}</span>
          </div>
          <div class="flex justify-between font-light mb-2">
            keyboard x 1<span class="font-bold">{{ '150' | currency }}</span>
          </div>
          <div class="flex justify-between font-light mb-2">
            keyboard x 1<span class="font-bold">{{ '150' | currency }}</span>
          </div>
        </div>
        <div class="text-right pb-3 py-3">
          Total: <span class="font-bold ">{{ '450' | currency }}</span>
        </div>
        <div class="pt-6 flex justify-between">
          <button class="bg-rose-800 text-white rounded-full w-9 h-9">
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
export class HeaderComponent{
  constructor() { }
  
  private _cart: Cart = { items: [] }
  itemsQuantity= 0;
  
  @Input() get cart(): Cart{
    return this._cart;
  }
  set cart(cart: Cart) {
    this._cart = cart;
    this.itemsQuantity = cart.items
      .map((item: { quantity: number; }) => item.quantity)
      .reduce((prev: number,current: number)=> prev + current, 0)
  }
}
