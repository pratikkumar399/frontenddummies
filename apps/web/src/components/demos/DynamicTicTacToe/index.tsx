"use client"

import React, { useState, useEffect } from 'react'
import TicTacToe from './component/TicTacToe'

interface DynamicTicTacToeProps {
    rows?: number;
    cols?: number;
}

const DynamicTicTacToe: React.FC<DynamicTicTacToeProps> = ({ rows = 3, cols = 3 }) => {
    const [currentPlayer, setCurrentPlayer] = useState<"X" | "O">("X");
    const [board, setBoard] = useState<(string | null)[]>([]);
    const [winner, setWinner] = useState<string | null>(null);



    const handlePlay = (m: number, n: number) => {
        const index = m * cols + n;

        // Check if move is allowed
        if (board[index] !== null || winner !== null) {
            return;
        }

        // Update board
        const newBoard = [...board];
        newBoard[index] = currentPlayer;
        setBoard(newBoard);

        // Check for winner
        const gameWinner = checkWinner(newBoard, rows, cols);
        if (gameWinner) {
            setWinner(gameWinner);
        } else {
            // Switch player
            setCurrentPlayer(currentPlayer === "X" ? "O" : "X");
        }
    };

    const checkWinner = (currentBoard: (string | null)[], numRows: number, numCols: number): string | null => {
        // Check rows
        for (let i = 0; i < numRows; i++) {
            const rowStart = i * numCols;
            const firstCell = currentBoard[rowStart];
            if (firstCell !== null) {
                let allSame = true;
                for (let j = 1; j < numCols; j++) {
                    if (currentBoard[rowStart + j] !== firstCell) {
                        allSame = false;
                        break;
                    }
                }
                if (allSame) return firstCell;
            }
        }

        // Check columns
        for (let j = 0; j < numCols; j++) {
            const firstCell = currentBoard[j];
            if (firstCell !== null) {
                let allSame = true;
                for (let i = 1; i < numRows; i++) {
                    if (currentBoard[i * numCols + j] !== firstCell) {
                        allSame = false;
                        break;
                    }
                }
                if (allSame) return firstCell;
            }
        }

        // Check left-to-right diagonal (only if square grid)
        if (numRows === numCols) {
            const firstCell = currentBoard[0];
            if (firstCell !== null) {
                let allSame = true;
                for (let i = 1; i < numRows; i++) {
                    if (currentBoard[i * numCols + i] !== firstCell) {
                        allSame = false;
                        break;
                    }
                }
                if (allSame) return firstCell;
            }

            // Check right-to-left diagonal
            const topRightCell = currentBoard[numCols - 1];
            if (topRightCell !== null) {
                let allSame = true;
                for (let i = 1; i < numRows; i++) {
                    if (currentBoard[i * numCols + (numCols - 1 - i)] !== topRightCell) {
                        allSame = false;
                        break;
                    }
                }
                if (allSame) return topRightCell;
            }
        }

        return null;
    };

    const handleReset = () => {
        const size = rows * cols;
        setBoard(Array(size).fill(null));
        setCurrentPlayer("X");
        setWinner(null);
    };

    const isDraw = board.every(cell => cell !== null) && winner === null;


    // Initialize board when rows/cols change
    useEffect(() => {
        if (rows && cols) {
            const size = rows * cols;
            setBoard(Array(size).fill(null));
            setCurrentPlayer("X");
            setWinner(null);
        }
    }, [rows, cols]);

    return (
        <div className="tic-tac-toe-container">
            <div className="game-info">
                <div className="current-player">
                    Current Player: <span className="player-value">{currentPlayer}</span>
                </div>
                {winner && (
                    <div className="winner-message">
                        Winner: <span className="winner-value">{winner}</span>
                    </div>
                )}
                {isDraw && (
                    <div className="draw-message">It's a Draw!</div>
                )}
                <button className="reset-button" onClick={handleReset}>
                    Reset Game
                </button>
            </div>
            <TicTacToe
                rows={rows}
                cols={cols}
                board={board}
                onPlay={handlePlay}
                disabled={winner !== null}
            />
        </div>
    );
}

export default DynamicTicTacToe
