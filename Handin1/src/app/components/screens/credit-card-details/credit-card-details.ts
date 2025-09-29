import { Component, effect, inject, OnDestroy, signal } from '@angular/core';
import { CreditCardService } from '../../../services/credit-card-service';
import { CreditCard } from '../../../interfaces/credit-card';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TransactionsList } from '../../lists/transactions-list/transactions-list';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [TransactionsList],
  templateUrl: './credit-card-details.html',
  styleUrl: './credit-card-details.css'
})
export class CreditCardDetails implements OnDestroy{
  private route = inject(ActivatedRoute);
  private svc = inject(CreditCardService);

  cardNumberParam = toSignal(
    this.route.paramMap.pipe(map(pm => (pm.get('cardNumber') ?? '').replace(/\s+/g, ''))),
    { initialValue: '' }
  );

  loading = signal(false);
  removing = signal(false);
  error = signal<string | null>(null);

  card = signal<CreditCard | null>(null);

  constructor() {
    effect(() => {
      const num = this.cardNumberParam();
      if (!num) return;

      this.loading.set(true);
      this.error.set(null);

      this.svc.getByCardNumber(Number(num)).subscribe({
        next: (c) => {
          this.card.set(c);
          this.loading.set(false);
        },
        error: (err) => {
          console.error(err);
          this.loading.set(false);
          this.error.set('Failed to load card details.');
        }
      });
    });
  }

  formatCardNumber(n: string | number) {
    return String(n).replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  ngOnDestroy(): void {}
}
