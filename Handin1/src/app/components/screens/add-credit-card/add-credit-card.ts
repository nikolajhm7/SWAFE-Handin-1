import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardService } from '../../../services/credit-card-service';
import { Router, RouterLink } from '@angular/router';
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
