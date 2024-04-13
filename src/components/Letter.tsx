import { useContext, useEffect } from 'react'
import { AppContext } from '../pages/Home'


interface Props {
    letterPos: number,
    attemptVal: number
}

export const Letter = ({letterPos, attemptVal}: Props) => {
    const {board, correctWord, currAttempt, setDisabledLetters} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];

    const correct = (correctWord[letterPos] === letter);
    const almost = !correct && letter !== "" && correctWord.includes(letter);

    const letterState = (currAttempt.attempt > attemptVal) && (correct ? "correct" : almost ? "almost" : "error");
    const letterStateString = letterState === false ? '' : String(letterState);

    useEffect(() => {
        if(letter !== "" && !correct && !almost){
            setDisabledLetters((prev) => [...prev, letter])
        }
    }, [currAttempt.attempt])

    return <div className="letter" id={letterStateString}> {letter} </div>
}