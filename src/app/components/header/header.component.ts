import { Component, OnInit } from '@angular/core';

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
          <button class="bg-green-600 text-white rounded-full w-9 h-9">
            <mat-icon>shopping_cart</mat-icon>
          </button>
        </div>
      </div>
    </mat-menu>
  </mat-toolbar>
  `,
})
export class HeaderComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {}
}
