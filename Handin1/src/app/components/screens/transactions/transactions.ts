import { Component, computed, inject, signal } from '@angular/core';
import { Transaction } from '../../../interfaces/credit-card/transaction';
import { TransactionsService } from '../../../services/transactions-service';
import { AuthService } from '../../../services/auth-service';
import { TransactionsList } from '../../lists/transactions-list/transactions-list';
import { CardNumberPipe } from '../../../pipes/card-number.pipe';
import { CreateTransaction } from '../../../interfaces/credit-card/create-transaction';
import { CreditCardService } from '../../../services/credit-card-service';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { AddTransactionForm } from '../../forms/add-transaction-form/add-transaction-form';

@Component({
  selector: 'app-transactions',
  standalone: true,
  imports: [TransactionsList, CardNumberPipe, AddTransactionForm],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})
export class Transactions {
  transactionService = inject(TransactionsService);
  authService = inject(AuthService);
  cardsService = inject(CreditCardService);

  loading = signal(false);
  adding = signal(false);
  error = signal<string | null>(null);
  transactions = signal<Transaction[]>([]);

  cards = signal<CreditCard[] | null>(null);

  transactionsFilter = signal<string>('');

  deletingId = signal<string | null>(null);
  private snapshot: Transaction[] | null = null;

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
      () => {
        this.fetchTransactions();
        this.cardsService.getAll().subscribe({
          next: (list) => this.cards.set(list),
          error: (err) => console.error('Failed to load cards', err)
        })
      },
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

  onDeleteTransaction(t: Transaction) {
    if (this.deletingId()) return;
    this.deletingId.set(t.uid);

    this.snapshot = this.transactions(); // til at kunne rollback hvis det fejler
    this.transactions.update(list => list.filter(x => x.uid !== t.uid));

    this.transactionService.deleteTransaction(t.uid).subscribe({
      next: () => {
        this.deletingId.set(null);
        this.snapshot = null;
      },
      error: (err) => {
        console.error(err);
        if (this.snapshot){
          this.transactions.set(this.snapshot);
        }

        this.deletingId.set(null);
        this.error.set('Failed to delete transaction. See console.');
      }
    })
  }

  onCreateTransaction(t: CreateTransaction) {
    if (this.adding()) return;
    this.adding.set(true);

    this.transactionService.addTransaction(t).subscribe({
      next: (created) => {
        this.transactions.update(list => [created, ...list]);
        this.adding.set(false);
      },
      error: (err) => {
        console.error(err);
        this.adding.set(false);
        this.error.set('Failed to add transaction. See console.');
      }
    })
  }

  setFilter(v: string) { this.transactionsFilter.set(v); }
  clearFilter() { this.transactionsFilter.set(''); }
}
