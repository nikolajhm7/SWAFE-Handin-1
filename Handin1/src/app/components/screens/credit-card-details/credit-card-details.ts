import { Component, computed, effect, inject, OnDestroy, signal } from '@angular/core';
import { CreditCardService } from '../../../services/credit-card-service';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map } from 'rxjs';
import { TransactionsList } from '../../lists/transactions-list/transactions-list';
import { CardNumberPipe } from '../../../pipes/card-number.pipe';
import { ExpirationDatePipe } from '../../../pipes/expiration-date.pipe';
import { TransactionsService } from '../../../services/transactions-service';
import { Transaction } from '../../../interfaces/transaction/transaction';

@Component({
  selector: 'app-credit-card-details',
  standalone: true,
  imports: [TransactionsList, CardNumberPipe, ExpirationDatePipe],
  templateUrl: './credit-card-details.html',
  styleUrl: './credit-card-details.css'
})
export class CreditCardDetails implements OnDestroy{
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private svc = inject(CreditCardService);
  private transactionsService = inject(TransactionsService);

  cardNumberParam = toSignal(
    this.route.paramMap.pipe(map(pm => (pm.get('cardNumber') ?? '').replace(/\s+/g, ''))),
    { initialValue: '' }
  );

  loading = signal(false);
  removing = signal(false);
  error = signal<string | null>(null);

  card = signal<CreditCard | null>(null);

  transactionDeletingId = signal<string | null>(null);
  cardTransactions = computed<Transaction[]>(() => this.card()?.transactions ?? []);

  private transactionsSnapshot: Transaction[] | null = null;

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

  deleteCard() {
    const c = this.card();
    if (!c || this.removing()) return;

    const ok = window.confirm('Are you sure you want to delete this credit card? This action cannot be undone.');
    if (!ok) return;

    this.removing.set(true);
    this.error.set(null);

    this.svc.delete(c.cardNumber).subscribe({
      next: () => {
        this.removing.set(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
        this.removing.set(false);
        this.error.set('Failed to delete the credit card.');
      }
    });
  }

  onDeleteTransaction(t: Transaction) {
    if (this.transactionDeletingId()) return;      // ensure one at a time
    const current = this.card();
    if (!current) return;

    this.transactionDeletingId.set(t.uid);

    // snapshot + optimistic remove
    this.transactionsSnapshot = current.transactions;
    this.card.update(c =>
      c ? { ...c, transactions: c.transactions.filter(x => x.uid !== t.uid) } : c
    );

    this.transactionsService.deleteTransaction(t.uid).subscribe({
      next: () => {
        this.transactionDeletingId.set(null);
        this.transactionsSnapshot = null;
      },
      error: (err) => {
        console.error(err);
        // rollback on failure
        const snap = this.transactionsSnapshot;
        this.card.update(c => (c && snap) ? { ...c, transactions: snap } : c);
        this.transactionDeletingId.set(null);
        this.error.set('Failed to delete transaction. See console.');
      }
    });
  }

  formatCardNumber(n: string | number) {
    return String(n).replace(/\D/g, '').replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  ngOnDestroy(): void {}
}