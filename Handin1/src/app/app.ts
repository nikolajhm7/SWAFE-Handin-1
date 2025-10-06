import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationBar } from './components/navigation-bar/navigation-bar';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [RouterOutlet, NavigationBar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('Handin1');
}
