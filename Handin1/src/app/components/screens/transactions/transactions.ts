import { Component, computed, inject, signal } from '@angular/core';
import { Transaction } from '../../../interfaces/credit-card/transaction';
import { TransactionsService } from '../../../services/transactions-service';
import { AuthService } from '../../../services/auth-service';
import { TransactionsList } from '../../lists/transactions-list/transactions-list';
import { DecimalPipe } from '@angular/common';
import { CardNumberPipe } from '../../../pipes/card-number-pipe';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionsList, DecimalPipe, CardNumberPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {
  transactionService = inject(TransactionsService);
  authService = inject(AuthService);

  loading = signal(false);
  error = signal<string | null>(null);
  transactions = signal<Transaction[]>([]);

  transactionsFilter = signal<string>('');

  uniqueCardNumbers = computed(() => {
    const set = new Set(this.transactions().map(t => t.cardNumber));
    return Array.from(set).filter(Boolean);
  })

  filteredTransactions = computed(() => {
    const filter = this.transactionsFilter();
    if (!filter) return this.transactions();

    return this.transactions().filter(t => {
      const cardNum = t.cardNumber;
      return cardNum.toString().includes(filter);
    })
  })

  ngOnInit() {
    this.loading.set(true);
    this.error.set(null);

    this.authService.autoLoginAndRun(
      () => this.fetchTransactions(),
      (err) => {
        this.loading.set(false);
        this.error.set('Auto-login failed.');
      }
    )
  }

  fetchTransactions() {
    this.transactionService.getTransactions().subscribe({
      next: (list) => {
        this.transactions.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Failed to load transactions.');
        console.error(err);
      }
    })
  }

  setFilter(v: string) { this.transactionsFilter.set(v); }
  clearFilter() { this.transactionsFilter.set(''); }
}
