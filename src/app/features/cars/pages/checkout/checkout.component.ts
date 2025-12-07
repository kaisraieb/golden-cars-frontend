import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { FavoritesCartService } from '../../../../core/services/favorites-cart.service';
import { Car } from '../../models/car.model';

export interface PaymentMethod {
  id: string;
  name: string;
  icon: string;
  description: string;
}

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  cart: Car[] = [];
  total = 0;
  selectedPaymentMethod = '';
  showPaymentMethods = false;

  // Form data
  firstName = '';
  lastName = '';
  email = '';
  phone = '';
  address = '';
  city = '';
  postalCode = '';
  country = '';

  paymentMethods: PaymentMethod[] = [
    {
      id: 'card',
      name: 'Carte de crédit/débit',
      icon: '💳',
      description: 'Visa, Mastercard, American Express'
    },
    {
      id: 'paypal',
      name: 'PayPal',
      icon: '🅿️',
      description: 'Payer avec votre compte PayPal'
    },
    {
      id: 'bank',
      name: 'Virement bancaire',
      icon: '🏦',
      description: 'Transfert direct depuis votre banque'
    },
    {
      id: 'check',
      name: 'Chèque',
      icon: '📝',
      description: 'Paiement par chèque'
    }
  ];

  constructor(
    private favoritesCartService: FavoritesCartService,
    private router: Router
  ) {}

  ngOnInit() {
    this.favoritesCartService.cart$.subscribe(cart => {
      this.cart = cart;
      this.total = this.favoritesCartService.getCartTotal();
      if (cart.length === 0) {
        this.router.navigate(['/cart']);
      }
    });
  }

  selectPaymentMethod(methodId: string) {
    this.selectedPaymentMethod = methodId;
    this.showPaymentMethods = true;
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  }

  onSubmit() {
    if (!this.selectedPaymentMethod) {
      alert('Veuillez sélectionner une méthode de paiement');
      return;
    }

    // Validate form
    if (!this.firstName || !this.lastName || !this.email || !this.phone || !this.address || !this.city || !this.postalCode) {
      alert('Veuillez remplir tous les champs obligatoires');
      return;
    }

    // Process order
    const order = {
      items: this.cart,
      total: this.total,
      paymentMethod: this.selectedPaymentMethod,
      customer: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        phone: this.phone,
        address: this.address,
        city: this.city,
        postalCode: this.postalCode,
        country: this.country
      }
    };

    console.log('Order submitted:', order);
    // Here you would typically send this to your backend
    
    // Add to order history
    this.favoritesCartService.addOrder(this.cart, this.total);
    
    // Clear cart and redirect
    this.favoritesCartService.clearCart();
    alert('Commande passée avec succès !');
    this.router.navigate(['/']);
  }
}

