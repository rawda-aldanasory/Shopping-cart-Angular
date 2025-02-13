import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <header>
      <nav>
        <ul>
          <li><a routerLink="/">Home</a></li>
          <li><a routerLink="/cart">Cart</a></li>
          <li><a routerLink="/admin">Admin</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    header {
      background-color: #333;
      padding: 1rem;
    }
    nav ul {
      list-style: none;
      display: flex;
      gap: 1rem;
      margin: 0;
      padding: 0;
    }
    nav a {
      color: white;
      text-decoration: none;
    }
    main {
      padding: 1rem;
    }
  `]
})
export class AppComponent {
  title = 'shopping-cart';
}
