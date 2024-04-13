import { useContext, useEffect } from "react"
import { AppContext } from "../pages/Home"

export function GameOver() {
    const { gameOver, currAttempt, correctWord, onReset} = useContext(AppContext);

    useEffect(() => {
        
    }, [])


    return <div>
        <h3>{gameOver.guessedWord ? "Guessed the Word" : "You Failed"}</h3>
        <h1>Correct Word: {correctWord}</h1>
        {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempt</h3>)}
        <button onClick={onReset}>Restart</button>
    </div>
}