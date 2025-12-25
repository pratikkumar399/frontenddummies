"use client"

import React from 'react'
import './style.css'

interface TicTacToeProps {
    rows: number;
    cols: number;
    board: (string | null)[];
    onPlay: (m: number, n: number) => void;
    disabled: boolean;
}

const TicTacToe: React.FC<TicTacToeProps> = ({ rows, cols, board, onPlay, disabled }) => {
    const handleCellClick = (m: number, n: number) => {
        if (disabled) return;
        const index = m * cols + n;
        if (board[index] !== null) return;
        onPlay(m, n);
    };

    return (
        <div className="tic-tac-toe-board">
            {new Array(rows).fill(null).map((_, rowIndex) => (
                <div key={rowIndex} className="board-row">
                    {new Array(cols).fill(null).map((_, colIndex) => {
                        const index = rowIndex * cols + colIndex;
                        const cellValue = board[index];
                        const isDisabled = disabled || cellValue !== null;

                        return (
                            <button
                                key={colIndex}
                                className={`board-cell ${isDisabled ? 'disabled' : ''}`}
                                onClick={() => handleCellClick(rowIndex, colIndex)}
                                disabled={isDisabled}
                            >
                                {cellValue || ''}
                            </button>
                        );
                    })}
                </div>
            ))}
        </div>
    );
}

export default TicTacToe
