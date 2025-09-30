import { Component, inject, input, signal } from '@angular/core';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { Router } from '@angular/router';
import { CardNumberPipe } from '../../../pipes/card-number.pipe';
import { ExpirationDatePipe } from '../../../pipes/expiration-date.pipe';

@Component({
  selector: 'app-credit-card-list',
  standalone: true,
  imports: [CardNumberPipe, ExpirationDatePipe],
  templateUrl: './credit-card-list.html',
  styleUrl: './credit-card-list.css'
})
export class CreditCardList {
  private router = inject(Router);
  cards = input<CreditCard[] | null>(null);

  openDetails(cardNumber: number) {
    const compact = String(cardNumber).replace(/\s+/g, '');
    this.router.navigate(['/cards', compact]);
  }
}
