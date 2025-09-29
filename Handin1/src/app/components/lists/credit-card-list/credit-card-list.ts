import { Component, inject, input, signal } from '@angular/core';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { Router } from '@angular/router';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  templateUrl: './credit-card-list.html',
  styleUrl: './credit-card-list.css'
})
export class CreditCardList {
  private router = inject(Router);
  cards = input<CreditCard[] | null>(null);
  
  formatCardNumber(n: number): string {
    return String(n).replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  openDetails(cardNumber: number) {
    const compact = String(cardNumber).replace(/\s+/g, '');
    this.router.navigate(['/cards', compact]);
  }
}
