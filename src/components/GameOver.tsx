import { useContext } from "react"
import { AppContext } from "../pages/Home"
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import { ScoreCard } from "./ScoreCard";

export function GameOver() {
    const [user] = useAuthState(auth);

    const { gameOver, currAttempt, correctWord, setGameOver, onReset} = useContext(AppContext);

    const reset = () => {
        setGameOver({gameOver: false, guessedWord: false});
        onReset();
    }

    return <div className="gameOver">
        <div className="gameOver-inner">
            <h3>{gameOver.guessedWord ? "You guessed the Word" : "You Failed"}</h3>
            <h1>Correct Word: {correctWord}</h1>
            {gameOver.guessedWord && (<h3>You guessed in {currAttempt.attempt} attempt</h3>)}
            {user && <ScoreCard />}
            <button onClick={reset}>Restart</button>
        </div>
    </div>
}