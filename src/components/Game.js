import React, { useState } from "react";
import Board from "./Board";

const Game = () => {
	const [history, setHistory] = useState([
		{
			squares: Array(9).fill(null),
		},
	]);
	const [xIsNext, setXIsNext] = useState(true);

	const current = history[history.length - 1];
	const squares = current.squares.slice(); // make a shallow copy of the array

	const moves = history.map((step, move /*move = index */) => {
		const description = move ? "Go to move #" + move : "Go to game start";
		return (
			<li key={move}>
				<button onClick={this.jumpTo(move)}>{description}</button>
			</li>
		);
	});

	const handleClick = (i) => {
		if (calculateWinner(squares) || squares[i] || !squares.includes(null)) {
			// !squares.includes(null) - I added this to not proceed the game if all squares are used and there is no winner
			return; // ignore a click if someone has won the game or if a Square is already filled
		}

		squares[i] = xIsNext ? "X" : "O";
		setHistory(
			history.concat([
				// Unlike the push() method, the concat() method doesn’t mutate the original array, so we prefer it.
				{
					squares: squares,
				},
			])
		);
		setXIsNext(!xIsNext);
	};

	const calculateWinner = (squares) => {
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
		<div className="game">
			<div className="game-board">
				<Board squares={squares} handleClick={handleClick} status={status} />
			</div>
			<div className="game-info">
				<div>{/*status*/}</div>
				<ol>{/*TODO*/}</ol>
			</div>
		</div>
	);
};

export default Game;
