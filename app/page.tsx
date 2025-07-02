'use client';
import React, { useState } from 'react';
import styles from './tictactoe.module.css';

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [namesSet, setNamesSet] = useState(false);
  const winner = calculateWinner(board);

  const handleClick = (index: number) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = isXTurn ? 'X' : 'O';
    setBoard(newBoard);
    setIsXTurn(!isXTurn);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const renameGame = () => {
    setPlayer1Name('');
    setPlayer2Name('');
    setNamesSet(false);
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
  };

  const renderCell = (index: number) => (
    <button
      className={styles.cell}
      onClick={() => handleClick(index)}
    >
      {board[index]}
    </button>
  );

  return (
  <div className={styles.container}>
    <div className={styles.game}>
      {/* eslint-disable-next-line react/no-unescaped-entities */}
      <h1 className={styles.title}>Ben Joseph's Tic Tac Toe</h1>
      
      {!namesSet ? (
        
        <div className={styles.nameForm}>
          <h2 className={styles.h2Tag}>Enter your name</h2>
          <input
            type="text"
            placeholder="Player 1 (X)"
            value={player1Name}
            onChange={(e) => setPlayer1Name(e.target.value)}
            className={styles.inputTag}
          />
          <input
            type="text"
            placeholder="Player 2 (O)"
            value={player2Name}
            onChange={(e) => setPlayer2Name(e.target.value)}
            className={styles.inputTag}
          />
          <button
            className={styles.startBtn}
            onClick={() => {
              if (player1Name && player2Name) setNamesSet(true);
            }}
          >
            Start Game
          </button>
        </div>
      ) : (
        <>
          <p className={styles.pTag}>
            {winner
              ? `Congratulations ${winner === 'X' ? player1Name : player2Name}!`
             : `${isXTurn ? `${player1Name}'s turn (X)` : `${player2Name}'s turn (O)`}`}
          </p>

          <div className={styles.board}>
           {board.map((_, i) => (
              <React.Fragment key={i}>
                {renderCell(i)}
              </React.Fragment>
            ))}
          </div>
            <div className={styles.buttonContainer}>
          <button onClick={resetGame} className={styles.resetBtn}>Restart</button>
          <button onClick={renameGame} className={styles.resetBtn}>Rename</button>
          </div>
        </>
      )}
    </div>
  </div>
);
};

function calculateWinner(squares: Array<string | null>) {
  const lines = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
  ];
  for (const [a, b, c] of lines) {
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default TicTacToe;
