import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import GameOver from "./components/GameOver";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./winningCombinations";

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
]

function getActivePlayer(gameTurns) {
  let currentPlayer = 'X';
  if (gameTurns[0]?.player === 'X') {
    currentPlayer = 'O';
  }
  return currentPlayer;
}

function getWinner(gameBoard, players) {
  let winner = null;

  for (const comb of WINNING_COMBINATIONS) {
    const first = gameBoard[comb[0].row][comb[0].col];
    const second = gameBoard[comb[1].row][comb[1].col];
    const third = gameBoard[comb[2].row][comb[2].col];

    if (first && first === second && first === third) {
      winner = players[first];
    }
  }
}

function getGameBoard(gameTurns) {
  let gameBoard = [...initialBoard.map(comb => [...comb])];

  gameTurns.forEach(turn => {
    const { row, col, player } = turn;
    gameBoard[row][col] = player;
  })

  return gameBoard;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [playerNames, setPlayerNames] = useState({
    X: 'Player 1',
    O: 'Player 2'
  });

  let gameBoard = getGameBoard(gameTurns);

  const activePlayer = getActivePlayer(gameTurns);
  const winner = getWinner(gameBoard, playerNames);
  const hasWon = gameTurns.length === 9 && !winner;

  function onBoardSelect(rid, cid) {
    if (gameTurns.find(turn => turn.row === rid && turn.col === cid))
      return;

    setGameTurns(prevTurns => {
      const currentPlayer = getActivePlayer(prevTurns);
      const updatedTurns = [{ row: rid, col: cid, player: currentPlayer }, ...prevTurns];

      return updatedTurns;
    })
  }

  function resetBoard() {
    setGameTurns([]);
    gameBoard = initialBoard;
  }

  function changePlayerName(symbol, name) {
    setPlayerNames(prevState => {
      return {
        ...prevState,
        [symbol]: name
      }
    })
  }

  return <main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player name={playerNames.X} symbol={"X"} changePlayerName={changePlayerName} isActive={activePlayer === 'X'} />
        <Player name={playerNames.O} symbol={"O"} changePlayerName={changePlayerName} isActive={activePlayer === 'O'} />
      </ol>
      {(winner || hasWon) && <GameOver winner={winner} resetBoard={resetBoard} />}
      <GameBoard gameBoard={gameBoard} onBoardSelect={onBoardSelect} />
    </div>
    <Log gameTurns={gameTurns} />
  </main>
}

export default App
