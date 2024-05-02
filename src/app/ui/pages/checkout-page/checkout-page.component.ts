import { Component, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Product } from '../../../domain/models/product/product';
import { ShoppingCartService } from '../../core/services/shopping-cart/shopping-cart.service';
import { CheckoutComponent } from '../../shared/molecules/checkout/checkout.component';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [CheckoutComponent],
  templateUrl: './checkout-page.component.html',
  styleUrl: './checkout-page.component.css',
})
export class CheckoutPageComponent {
  checkoutProducts = signal<Product[]>([]);

  constructor(
    private shoppingCart: ShoppingCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.checkoutProducts.set(this.shoppingCart.getCart());
  }

  createOrder() {
    //Must be replaced with API CALL
    const rawOrders = window.sessionStorage.getItem('orders') ?? '';
    const parsedOrders = rawOrders != '' ? JSON.parse(rawOrders) :  [];
    parsedOrders.push({
      id: Math.floor(Math.random() * 9999),
      products: this.checkoutProducts(),
      date: new Date(),
      userId: 'user1'
    });
    window.sessionStorage.setItem('orders', JSON.stringify(parsedOrders));
  }

  radicateOrder() {
    this.createOrder();
    this.shoppingCart.emptyCar();
    this.router.navigate(['/orders']);
  }
}
