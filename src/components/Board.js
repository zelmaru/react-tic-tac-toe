import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null)); // an array of 9 nulls (9 squares)
	const [xIsNext, setXIsNext] = useState(true);

	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i] || !squares.includes(null)) {
			// !squares.includes(null) - I added this to not proceed the game if all squares are used and there is no winner
			return; // ignore a click if someone has won the game or if a Square is already filled
		}
		const newSquares = squares.slice(); // make a shallow copy of the array
		newSquares[i] = xIsNext ? "X" : "O";
		setSquares(newSquares);
		setXIsNext(!xIsNext);
	};

	const renderSquare = (i) => {
		return <Square value={squares[i]} onClick={() => handleClick(i)} />;
	};

	const calculateWinner = () => {
		const lines = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (let i = 0; i < lines.length; i++) {
			const [a, b, c] = lines[i];
			if (
				squares[a] &&
				squares[a] === squares[b] &&
				squares[a] === squares[c]
			) {
				return squares[a];
			}
		}
		return null;
	};

	const winner = calculateWinner(squares);
	let status;
	if (winner) {
		status = `Winner: ${winner}`;
	} else if (!squares.includes(null)) {
		status = "Game over, there is no winner";
	} else {
		status = `Next player: ${xIsNext ? "X" : "O"}`;
	}

	return (
		<>
			<div className="status">{status}</div>
			<div className="board-row">
				{renderSquare(0)}
				{renderSquare(1)}
				{renderSquare(2)}
			</div>
			<div className="board-row">
				{renderSquare(3)}
				{renderSquare(4)}
				{renderSquare(5)}
			</div>
			<div className="board-row">
				{renderSquare(6)}
				{renderSquare(7)}
				{renderSquare(8)}
			</div>
		</>
	);
};

export default Board;
