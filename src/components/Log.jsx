export default function Log({ gameTurns }) {
    return (
        <ol id="log">
            {gameTurns.map(turn => (
                <li key={turn.row + "" + turn.col}>{turn.player} selected {turn.row}, {turn.col}</li>
            ))}
        </ol>
    )
}