import React, { useState } from "react";
import Square from "./Square";

const Board = () => {
	const [squares, setSquares] = useState(Array(9).fill(null)); // an array of 9 nulls (9 squares)

	const renderSquare = (i) => {
		return <Square value={squares[i]} />;
	};

	const status = "Next player: X";

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
