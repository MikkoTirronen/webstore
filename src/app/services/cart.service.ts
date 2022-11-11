import { _isTestEnvironment } from '@angular/cdk/platform';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject } from 'rxjs';
import { Cart, CartItem } from '../models/cart.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart = new BehaviorSubject<Cart>({
    items: [],
  });

  constructor(
    private _snackBar: MatSnackBar,
    private httpClient: HttpClient,
    private jwtHelper: JwtHelperService
  ) {}

  //addToCart, or increase quantity if already in cart.
  addToCart(item: CartItem): void {
    const items = [...this.cart.value.items];
    const itemInCart = items.find((_item) => _item.id === item.id);

    if (itemInCart) {
      itemInCart.quantity += 1;
    } else {
      items.push(item);
    }
    this.cart.next({ items });
    this._snackBar.open(`${item.name} added to Cart!`, 'Ok', {
      duration: 3000,
    });
    this.updateTempCart();
  }

  //Reduce total quantity of a specific item.
  subtractQuantity(item: CartItem): void {
    let itemForRemoval: CartItem | undefined;
    //find item and reduce quantity, removeFromCart if quantity is zero
    let filteredItems = this.cart.value.items.filter((_item) => {
      if (_item.id === item.id) {
        _item.quantity--;
        if (_item.quantity === 0) {
          itemForRemoval = _item;

        }
      }
      return _item;
    });
    //removeFromCart without notifying this user
    if (itemForRemoval) {
      filteredItems = this.removeFromCart(itemForRemoval, false);
    }
    this.cart.next({ items: filteredItems });
    this._snackBar.open(`${item.name} x1 removed from Cart.`, 'Ok', {
      duration: 3000,
    });
  }
  //Get cart Total price.
  getTotal(items: Array<CartItem>): number {
    return items
      .map((item) => item.price * item.quantity)
      .reduce((prev, current) => prev + current, 0);
  }

  //Remove all items in the Cart;
  clearCart(): void {
    this.cart.next({ items: [] });
    this._snackBar.open('Cart Cleared!', 'Ok', { duration: 3000 });
  }
  //Remove a specific item from the Cart regardless of quantity.
  removeFromCart(item: CartItem, notify = true): Array<CartItem> {
    const filteredItems = this.cart.value.items.filter(
      (_item) => _item.id != item.id
    );
    if (notify) {
      this.cart.next({ items: filteredItems });
      this._snackBar.open(`${item.name} removed from Cart`, 'Ok', {
        duration: 3000,
      });
    }
    return filteredItems;
  }
  getCart() {
    return JSON.parse(JSON.stringify(this.cart.value.items));
  }