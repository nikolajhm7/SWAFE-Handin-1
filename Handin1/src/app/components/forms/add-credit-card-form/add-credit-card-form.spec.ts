import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditCardForm } from './add-credit-card-form';

describe('AddCreditCardForm', () => {
  let component: AddCreditCardForm;
  let fixture: ComponentFixture<AddCreditCardForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCreditCardForm]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditCardForm);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
