import { Component, Input } from '@angular/core';
import { Product } from '../../../interfaces/product.interface';
import { CartService } from '../../../service/cart.service';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input() product!: Product;
  selectedQuantity = 0;

  constructor(private cartService: CartService) {}

  increaseQuantity(): void {
    if (this.selectedQuantity < this.product.quantity) {
      this.selectedQuantity++;
    }
  }

  decreaseQuantity(): void {
    if (this.selectedQuantity > 0) {
      this.selectedQuantity--;
    }
  }

  addToCart(): void {
    if (this.selectedQuantity > 0) {
      this.cartService.addToCart({
        product: this.product,
        quantity: this.selectedQuantity
      });
      this.product.quantity -= this.selectedQuantity;
      this.selectedQuantity = 0;
    }
  }
}