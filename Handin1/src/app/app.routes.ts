import { Routes } from '@angular/router';
import { Home } from './components/screens/home/home'
import { Transactions } from './components/screens/transactions/transactions';
import { AddCreditCard } from './components/screens/add-credit-card/add-credit-card';
import { CreditCardDetails } from './components/screens/credit-card-details/credit-card-details';

export const routes: Routes = [
    {path: '', component: Home, title: 'Home'},
    {path: 'transactions', component: Transactions, title: 'Transactions'},
    {path: 'cards/:cardNumber', component: CreditCardDetails, title: 'Card Details'},
    {path: 'add', component: AddCreditCard, title: 'Add Card'},
    {path: '**', redirectTo: ''} // udelukkende til at redirect alle ukendte paths til home
];
