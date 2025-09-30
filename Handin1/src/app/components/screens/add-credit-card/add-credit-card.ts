import { Component, inject } from '@angular/core';
import { AddCreditCardForm } from '../../forms/add-credit-card-form/add-credit-card-form';

@Component({
  selector: 'app-add-credit-card',
  standalone: true,
  imports: [AddCreditCardForm],
  templateUrl: './add-credit-card.html',
  styleUrl: './add-credit-card.css'
})
export class AddCreditCard {
}
