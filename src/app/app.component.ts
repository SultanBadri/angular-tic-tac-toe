import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  gameBoard: string[][] = [
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ];
  currentPlayer: string = 'X';
  gameOver: boolean = false;
  winner: string | null = null;

  makeMove(row: number, col: number): void {
    if (this.gameOver) return;
    if (this.gameBoard[row][col] !== '') return;
    this.gameBoard[row][col] = this.currentPlayer;
    this.checkForWin();
    this.checkForTie();
    if (!this.gameOver) {
      this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
    }
  }

  checkForWin(): void {
    const lines = [
      // rows
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      // columns
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      // diagonals
      [0, 4, 8],
      [2, 4, 6],
    ];

    lines.forEach((line) => {
      if (
        line.every(
          (cell) => this.gameBoard[Math.floor(cell / 3)][cell % 3] === 'X'
        )
      ) {
        this.gameOver = true;
        this.winner = 'X';
      }
      if (
        line.every(
          (cell) => this.gameBoard[Math.floor(cell / 3)][cell % 3] === 'O'
        )
      ) {
        this.gameOver = true;
        this.winner = 'O';
      }
    });
  }

  checkForTie(): void {
    if (
      !this.gameOver &&
      this.gameBoard.every((row) => row.every((cell) => cell !== ''))
    ) {
      this.gameOver = true;
    }
  }

  resetGame(): void {
    this.gameBoard = [
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ];
    this.currentPlayer = 'X';
    this.gameOver = false;
    this.winner = null;
  }
}
