import { useState, createContext, SetStateAction, Dispatch, useEffect } from "react";
import { Board } from "../components/Board"
import { Keyboard } from "../components/Keyboard"
import { BoardDefaultType, boardDefault, generateWordsSet } from "../Words";
import { GameOver } from "../components/GameOver";

interface BoardContextType {
    board: BoardDefaultType;
    setBoard: Dispatch<SetStateAction<BoardDefaultType>>;
    currAttempt: AttemptType,
    setCurrAttempt: Dispatch<SetStateAction<AttemptType>>;
    onSelectKey: (keyVal: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    onReset: () => void;
    disabledLetters: string[];
    setDisabledLetters: Dispatch<SetStateAction<string[]>>;
    gameOver: GuessType;
    setGameOver: Dispatch<SetStateAction<GuessType>>;
    correctWord: string, 
    setCorrectWord: Dispatch<SetStateAction<string>>;
}

interface AttemptType {
    attempt: number,
    letterPos: number,
}

interface GuessType {
    gameOver: boolean,
    guessedWord: boolean
}

export const AppContext = createContext<BoardContextType>({
    board: boardDefault, 
    setBoard: () => {}, 
    currAttempt: { attempt: 0, letterPos: 0 }, 
    setCurrAttempt: () => {},
    onSelectKey: () => {},
    onDelete: () => {},
    onEnter: () => {},
    onReset: () => {},
    disabledLetters: [],
    setDisabledLetters: () => {},
    gameOver: {gameOver: false, guessedWord: false},
    setGameOver: () => {},
    correctWord: "", 
    setCorrectWord: () => {},
    });

export const Home = () => {
    const [board, setBoard] = useState<BoardDefaultType>(boardDefault);
    const [currAttempt, setCurrAttempt] = useState<AttemptType>({attempt: 0, letterPos: 0});
    const [wordSet, setWordSet] = useState<Set<string>>(new Set());
    const [disabledLetters, setDisabledLetters] = useState<string[]>([]);
    const [gameOver, setGameOver] = useState<GuessType>({gameOver: false, guessedWord: false});
    const [correctWord, setCorrectWord] = useState<string>("");
    
    const onReset = () => {
        setBoard(boardDefault);
        setCurrAttempt({attempt: 0, letterPos: 0});
        setDisabledLetters([]);
        setGameOver({gameOver: false, guessedWord: false});
    }

    useEffect(() => {
        generateWordsSet().then((words) => {
            setWordSet(words.wordSet);
            setCorrectWord(words.todaysWord.toUpperCase());
        })
    }, [])


    const onSelectKey = (keyVal: string) => {
        if(currAttempt.letterPos > 4) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos+1})
    }

    const onDelete = () => {
        if(currAttempt.letterPos === 0) return;
        const newBoard = [...board];
        newBoard[currAttempt.attempt][currAttempt.letterPos-1] = "";
        setBoard(newBoard);
        setCurrAttempt({...currAttempt, letterPos: currAttempt.letterPos-1})
    }
    const onEnter = () => {
        if(currAttempt.letterPos !== 5) return;
        console.log(correctWord);
        let currWord: string = "";
        for(let i = 0; i < 5; i++){
            currWord += board[currAttempt.attempt][i];
        }
        
        if(wordSet.has(currWord.toLowerCase())){
            setCurrAttempt({attempt: currAttempt.attempt+1, letterPos: 0})
        }
        else alert("Word not Found");

        if(currWord === correctWord) {
            setGameOver({gameOver: true, guessedWord: true});
            return;
        }

        if(currAttempt.attempt === 5){
            setGameOver({gameOver: true, guessedWord: false});
            return;
        }

    }

    return (
        <div>
            <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectKey: onSelectKey, onDelete, onEnter, setDisabledLetters, disabledLetters, gameOver, setGameOver, correctWord, setCorrectWord, onReset}}>
            <div className="game">
                <Board />
                {gameOver.gameOver ? <GameOver/> : <Keyboard />}
            </div>
            </AppContext.Provider>
        </div>
    )
}