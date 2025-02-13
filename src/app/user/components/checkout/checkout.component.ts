import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CartService } from '../../../service/cart.service';
import { DialogService } from '../../../service/dialog.service';
import { CartItem } from '../../../interfaces/cart-item.interface'; 
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-checkout',
  imports: [CommonModule , ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: CartItem[] = [];
  total = 0;
  isProcessing = false;
  checkoutForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private cartService: CartService,
    private dialogService: DialogService,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      fullName: ['', Validators.required],
      address: ['', Validators.required],
      city: ['', Validators.required],
      postalCode: ['', Validators.required],
      country: ['', Validators.required],
      phone: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
    });

    this.cartService.getTotal().subscribe(total => {
      this.total = total;
    });
  }

  async onSubmit() {
    if (this.checkoutForm.valid) {
      const confirmed = await this.dialogService.confirm({
        title: 'Confirm Order',
        message: 'Are you sure you want to place this order?',
        confirmText: 'Place Order'
      });

      if (confirmed) {
        this.isProcessing = true;
        // Process order logic here
        this.isProcessing = false;
        this.router.navigate(['/']);
        
        setTimeout(() => {
          this.cartService.clearCart();
          
        }, 2000);
      }
    }
  }
}