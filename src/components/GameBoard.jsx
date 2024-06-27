export default function GameBoard({ gameBoard, onBoardSelect }) {

    return (
        <ol id="game-board">
            {gameBoard.map((row, rid) => (
                <li key={"r" + rid}>
                    <ol>
                        {row.map((playerSymbol, cid) => (
                            <li key={"c" + cid}>
                                <button onClick={() => onBoardSelect(rid, cid)}>{playerSymbol}</button>
                            </li>
                        )
                        )}
                    </ol>
                </li>
            )
            )}
        </ol>
    )
}