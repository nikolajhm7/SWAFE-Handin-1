import { Routes } from '@angular/router';
import { Home } from './components/screens/home/home'
import { Transactions } from './components/screens/transactions/transactions';
import { AddCreditCard } from './components/screens/add-credit-card/add-credit-card';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'transactions', component: Transactions},
    {path: 'add', component: AddCreditCard},
    {path: '**', redirectTo: ''} // udelukkende til at redirect alle ukendte paths til home
];
