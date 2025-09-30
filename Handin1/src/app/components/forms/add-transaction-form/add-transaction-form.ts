import { Component, inject, Inject, input, output } from '@angular/core';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { CreateTransaction } from '../../../interfaces/transaction/create-transaction';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardNumberPipe } from '../../../pipes/card-number.pipe';

const DIGITS = /^\d+$/;

@Component({
  selector: 'app-add-transaction-form',
  standalone: true,
  imports: [ReactiveFormsModule, CardNumberPipe],
  templateUrl: './add-transaction-form.html',
  styleUrl: './add-transaction-form.css'
})
export class AddTransactionForm {
  private formBuilder = inject(FormBuilder);

  cards = input<CreditCard[] | null>(null);

  pending = input<boolean>(false);

  create = output<CreateTransaction>();
  currencies = ['DKK', 'USD', 'EUR', 'GBP', 'SEK', 'MWK'];

  form = this.formBuilder.group({
    cardNumber: ['',
      Validators.required
    ],
    amount: ['',
      Validators.required,
      Validators.pattern(DIGITS) // regex til at tjekke om en string er et tal
    ],
    currencyCode: ['',
      Validators.required
    ],
    transactionDate: ['',
      Validators.required
    ],
    comment: ['']
  });

  get f() { return this.form.controls; }

  submit() {
    if (this.form.invalid || this.pending()) return;

    const value = this.form.value;

    const payload: CreateTransaction = {
      cardNumber: Number(value.cardNumber),
      amount: Number(value.amount),
      currencyCode: value.currencyCode!,
      transactionDate: value.transactionDate!,
      comment: value.comment || null
    }

    this.create.emit(payload);
  }
}
