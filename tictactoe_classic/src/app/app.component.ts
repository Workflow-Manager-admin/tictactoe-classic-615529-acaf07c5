import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TicTacToeComponent } from './components/tictactoe/tictactoe.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TicTacToeComponent],
  template: `
    <main>
      <app-tictactoe></app-tictactoe>
    </main>
  `,
  styles: [`
    main {
      width: 100%;
      min-height: 100vh;
      display: flex;
      justify-content: center;
      background-color: #ffffff;
    }
  `]
})
export class AppComponent {
  title = 'TicTacToe Classic';
}
