import { Component, input } from '@angular/core';
import { Transaction } from '../../../interfaces/transaction';
import { DatePipe, DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-transactions-list',
  standalone: true,
  imports: [DatePipe, DecimalPipe],
  templateUrl: './transactions-list.html',
  styleUrl: './transactions-list.css'
})
export class TransactionsList {
  transactions = input<Transaction[] | null>(null);
}
