import { Routes } from '@angular/router';
import { Home } from './components/screens/home/home'
import { Transactions } from './components/screens/transactions/transactions';
import { AddCreditCard } from './components/screens/add-credit-card/add-credit-card';

export const routes: Routes = [
    {path: '', component: Home, title: 'Home'},
    {path: 'transactions', component: Transactions, title: 'Transactions'},
    {   path: 'cards/:cardNumber', 
        loadComponent: () => import('./components/screens/credit-card-details/credit-card-details')
            .then(m => m.CreditCardDetails), 
        title: 'Card Details'}, // Lazy load
    {path: 'add', component: AddCreditCard, title: 'Add Card'},
    {path: '**', redirectTo: ''} // udelukkende til at redirect alle ukendte paths til home
];
