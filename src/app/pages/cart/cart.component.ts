import { Component, OnInit } from '@angular/core';
import { Cart, CartItem } from 'src/app/models/cart.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
})
export class CartComponent implements OnInit {
  constructor(private cartService: CartService) {}

  cart: Cart = {
    items: [
      {
        product: 'https://via.placeholder.com/150',
        name: 'sneakers',
        price: 150,
        quantity: 1,
        id: 1,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'sneakers',
        price: 350,
        quantity: 2,
        id: 2,
      },
      {
        product: 'https://via.placeholder.com/150',
        name: 'sneakers',
        price: 250,
        quantity: 3,
        id: 13,
      },
    ],
  };
  displayedColumns: Array<string> = [
    'product',
    'name',
    'price',
    'quantity',
    'total',
    'action',
  ];
  dataSource: Array<CartItem> = [];

  getTotal(items: Array<CartItem>): number {
    return this.cartService.getTotal(items)
  }

  ngOnInit(): void {
    this.dataSource = this.cart.items;
  }
}
