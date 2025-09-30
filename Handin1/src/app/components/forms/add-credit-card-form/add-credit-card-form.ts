import { Component, inject } from '@angular/core';
import { AbstractControl, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CreditCardService } from '../../../services/credit-card-service';
import { Router } from '@angular/router';
import { CardNumberPipe } from '../../../pipes/card-number-pipe';

// regex til at tjekke om en string kun indeholder tal
const DIGITS = /^\d+$/;

@Component({
  selector: 'app-add-credit-card-form',
  standalone: true,
  imports: [ReactiveFormsModule, CardNumberPipe],
  templateUrl: './add-credit-card-form.html',
  styleUrl: './add-credit-card-form.css'
})
export class AddCreditCardForm {
  private formBuilder = inject(FormBuilder);
  private cardsService = inject(CreditCardService);
  private router = inject(Router);

  form = this.formBuilder.group({
    cardholder_name: ['', [
      Validators.required         // F4.3.1
    ]],
    card_number: ['', [
      Validators.required,
      Validators.pattern(DIGITS), // F4.1.1
      Validators.minLength(7),    // F4.1.2
      Validators.maxLength(16)    // F4.1.2
    ]],
    csc_code: ['', [
      Validators.required,        // F4.2.4
      Validators.pattern(DIGITS), // F4.2.1
      Validators.minLength(3),    // F4.2.2
      Validators.maxLength(3)     // F4.2.2
    ]],
    expiration_month: ['', [
      Validators.required,        // F4.4.2
      Validators.pattern(DIGITS),
      Validators.min(1),          // F4.4.1
      Validators.max(12)          // F4.4.1
    ]],
    expiration_year: ['', [
      Validators.required,        // F4.5.1
      Validators.pattern(DIGITS),
    ]],
    issuer: ['']
  })

  digitsOnly(ctrl: AbstractControl) {
    const v = String(ctrl.value ?? '');
    const cleaned = v.replace(/\D+/g, '');
    if (v !== cleaned) ctrl.setValue(cleaned, { emitEvent: false });
  }

  submit() {
    if (this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    const value = this.form.value;

    const payload = {
      cardNumber: Number(value.card_number),
      cscCode: Number(value.csc_code),
      cardHolderName: value.cardholder_name!,
      expirationMonth: Number(value.expiration_month),
      expirationYear: Number(value.expiration_year),
      issuer: value.issuer ?? ''
    }

    this.cardsService.add(payload).subscribe({
      next: () => this.router.navigate(['/']),
      error: (err) => {
        this.form.setErrors({ submit: 'Failed to add card. See console.'});
        console.error(err);
      }
    });
  }

  get f() { return this.form.controls; }
}
