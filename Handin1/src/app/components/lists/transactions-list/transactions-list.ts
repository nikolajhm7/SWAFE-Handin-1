import { Component, input, output } from '@angular/core';
import { Transaction } from '../../../interfaces/credit-card/transaction';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CardNumberPipe } from '../../../pipes/card-number.pipe';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe, CardNumberPipe],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css'
})
export class TransactionsList {
  transactions = input<Transaction[] | null>(null);

  deletingId = input<string | null>(null);

  deleteTransaction = output<Transaction>();

  onDeleteClicked(t: Transaction, ev?: Event){
    ev?.stopPropagation();

    if (!confirm('Delete transaction?')) return;

    if (this.deletingId()) return;
    this.deleteTransaction.emit(t);
  }
}
