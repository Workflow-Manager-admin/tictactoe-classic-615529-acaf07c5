import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-tictactoe',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="game-container">
      <div class="game-status">
        <h2 *ngIf="!gameOver">Current Player: {{ currentPlayer }}</h2>
        <h2 *ngIf="winner">Player {{ winner }} Wins!</h2>
        <h2 *ngIf="isDraw">Game Draw!</h2>
      </div>

      <div class="game-board">
        <div class="board-row" *ngFor="let row of board; let i = index">
          <button 
            class="board-cell" 
            *ngFor="let cell of row; let j = index"
            (click)="makeMove(i, j)"
            [disabled]="cell !== '' || gameOver"
          >
            {{ cell }}
          </button>
        </div>
      </div>

      <div class="game-controls">
        <button class="reset-button" (click)="resetGame()">
          Restart Game
        </button>
      </div>
    </div>
  `,
  styles: [`
    .game-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 2rem;
      background-color: #ffffff;
      min-height: 100vh;
    }

    .game-status {
      margin-bottom: 2rem;
      text-align: center;
    }

    .game-status h2 {
      color: #000000;
      font-size: 1.5rem;
      margin: 0;
    }

    .game-board {
      display: flex;
      flex-direction: column;
      gap: 5px;
      background-color: #000000;
      padding: 5px;
      border-radius: 8px;
    }

    .board-row {
      display: flex;
      gap: 5px;
    }

    .board-cell {
      width: 100px;
      height: 100px;
      background-color: #ffffff;
      border: none;
      border-radius: 4px;
      font-size: 2.5rem;
      font-weight: bold;
      color: #2196f3;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .board-cell:hover:not(:disabled) {
      background-color: #f5f5f5;
    }

    .board-cell:disabled {
      cursor: not-allowed;
    }

    .game-controls {
      margin-top: 2rem;
    }

    .reset-button {
      padding: 0.75rem 1.5rem;
      font-size: 1rem;
      background-color: #2196f3;
      color: #ffffff;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.2s ease;
    }

    .reset-button:hover {
      background-color: #1976d2;
    }
  `]
})
export class TicTacToeComponent {
  board: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];

  currentPlayer: 'X' | 'O' = 'X';
  gameOver: boolean = false;
  winner: string | null = null;
  isDraw: boolean = false;

  makeMove(row: number, col: number): void {
    if (this.board[row][col] === '' && !this.gameOver) {
      this.board[row][col] = this.currentPlayer;

      if (this.checkWin()) {
        this.gameOver = true;
        this.winner = this.currentPlayer;
      } else if (this.checkDraw()) {
        this.gameOver = true;
        this.isDraw = true;
      } else {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
      }
    }
  }

  private checkWin(): boolean {
    // Check rows
    for (let i = 0; i < 3; i++) {
      if (
        this.board[i][0] !== '' &&
        this.board[i][0] === this.board[i][1] &&
        this.board[i][1] === this.board[i][2]
      ) {
        return true;
      }
    }

    // Check columns
    for (let i = 0; i < 3; i++) {
      if (
        this.board[0][i] !== '' &&
        this.board[0][i] === this.board[1][i] &&
        this.board[1][i] === this.board[2][i]
      ) {
        return true;
      }
    }

    // Check diagonals
    if (
      this.board[0][0] !== '' &&
      this.board[0][0] === this.board[1][1] &&
      this.board[1][1] === this.board[2][2]
    ) {
      return true;
    }

    if (
      this.board[0][2] !== '' &&
      this.board[0][2] === this.board[1][1] &&
      this.board[1][1] === this.board[2][0]
    ) {
      return true;
    }

    return false;
  }

  private checkDraw(): boolean {
    return this.board.every(row => row.every(cell => cell !== ''));
  }

  resetGame(): void {
    this.board = [
      ['', '', ''],
      ['', '', ''],
      ['', '', '']
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
    this.isDraw = false;
  }
}
