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
    this.autoLoginAndLoad();
  }

  autoLoginAndLoad() {
    this.loading.set(true);
    this.error.set(null);

    if (!this.isAuthenticated()) {
      this.authService.login(this.username, this.password).subscribe({
        next: () => this.fetchCards(),
        error: (err) => {
          this.loading.set(false);
          this.error.set('Auto-login failed. Check network / CORS.');
          console.error(err);
        }
      });
    } else {
      this.fetchCards();
    }
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

  resetSessionAndRetry() {
    this.authService.logout();
    this.cards.set(null);
    this.autoLoginAndLoad();
  }

  formatCardNumber(n: number): string {
    const s = String(n).replace(/\D/g, '');
    return s.replace(/(\d{4})(?=\d)/g, '$1 ');
  }
}
