export default function GameOver({winner, hasDraw, onRestart}){
    return (
        <div id="game-over">
            <h2>Game Over!</h2>
            {winner && <p>{winner} won!</p>}
            {hasDraw && <p>It's a tie!</p>}
            <p><button onClick={onRestart}>Rematch!</button></p>
        </div>
    )
}