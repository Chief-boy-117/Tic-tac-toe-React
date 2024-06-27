import { useState } from "react";

export default function Player({ name, changePlayerName, symbol, isActive }) {
    const [isEditing, setIsEditing] = useState(false);
    const [playerName, setPlayerName] = useState(name);

    function toggleEdit() {
        setIsEditing(prevState => !prevState);

        if (isEditing) {
            changePlayerName(symbol, playerName);
        }
    }

    function onNameChange(event) {
        setPlayerName(event.target.value);
    }

    return (
        <li className={isActive ? 'active' : ''}>
            <span className="player">
                {isEditing && <input type="text" value={playerName} onChange={(event) => onNameChange(event)} required />}
                {!isEditing && <span className="player-name">{playerName}</span>}
                <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={toggleEdit}>{isEditing ? "Save" : "Edit"}</button>
        </li>);
}