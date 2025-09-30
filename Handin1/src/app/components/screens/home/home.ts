import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../../services/auth-service';
import { CreditCardService } from '../../../services/credit-card-service';
import { CreditCard } from '../../../interfaces/credit-card/credit-card';
import { CreditCardList } from '../../lists/credit-card-list/credit-card-list';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CreditCardList],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class Home implements OnInit {
  private authService = inject(AuthService);
  private cardsService = inject(CreditCardService);

  // hardcoded login for den her assignment
  private username = 'g10@bank.dk';
  private password = '1234';

  loading = signal(false);
  error = signal<string | null>(null);
  cards = signal<CreditCard[] | null>(null);

  isAuthenticated = computed(() => this.authService.isAuthenticated);

  ngOnInit() {
    this.loading.set(true);
    this.error.set(null);

    this.authService.autoLoginAndRun(
      () => this.fetchCards(),
      (err) => {
        this.loading.set(false);
        this.error.set('Auto-login failed.');
      }
    )
  }

  fetchCards() {
    this.cardsService.getAll().subscribe({
      next: (list) => {
        this.cards.set(list);
        this.loading.set(false);
      },
      error: (err) => {
        this.loading.set(false);
        this.error.set('Failed to load credit cards.');
        console.error(err);
      }
    });
  }

  formatCardNumber(n: number): string {
    const s = String(n).replace(/\D/g, '');
    return s.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
