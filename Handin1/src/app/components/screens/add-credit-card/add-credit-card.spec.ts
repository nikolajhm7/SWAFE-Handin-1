import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCreditCard } from './add-credit-card';

describe('AddCreditCard', () => {
  let component: AddCreditCard;
  let fixture: ComponentFixture<AddCreditCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCreditCard]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddCreditCard);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
