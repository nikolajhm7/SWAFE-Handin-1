import { Component, input } from '@angular/core';
import { Transaction } from '../../../interfaces/credit-card/transaction';
import { DatePipe, DecimalPipe } from '@angular/common';
import { CardNumberPipe } from '../../../pipes/card-number-pipe';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe, CardNumberPipe],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css'
})
export class TransactionsList {
  transactions = input<Transaction[] | null>(null);
}
