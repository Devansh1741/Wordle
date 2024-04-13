import { useState, createContext, SetStateAction, Dispatch, useEffect } from "react";
import { Board } from "../components/Board"
import { Keyboard } from "../components/Keyboard"
import { BoardDefaultType, boardDefault, generateWordsSet } from "../Words";

interface BoardContextType {
    board: BoardDefaultType;
    setBoard: Dispatch<SetStateAction<BoardDefaultType>>;
    currAttempt: AttemptType,
    setCurrAttempt: Dispatch<SetStateAction<AttemptType>>;
    onSelectKey: (keyVal: string) => void;
    onDelete: () => void;
    onEnter: () => void;
    correctWord: string;
    disabledLetters: string[],
    setDisabledLetters: Dispatch<SetStateAction<string[]>>;
}

interface AttemptType {
    attempt: number,
    letterPos: number,
}

export const AppContext = createContext<BoardContextType>({
    board: boardDefault, 
    setBoard: () => {}, 
    currAttempt: { attempt: 0, letterPos: 0 }, 
    setCurrAttempt: () => {},
    onSelectKey: () => {},
    onDelete: () => {},
    onEnter: () => {},
    correctWord: "",
    disabledLetters: [],
    setDisabledLetters: () => {}
    });

export const Home = () => {
    const [board, setBoard] = useState<BoardDefaultType>(boardDefault);
    const [currAttempt, setCurrAttempt] = useState<AttemptType>({attempt: 0, letterPos: 0});
    const [wordSet, setWordSet] = useState<Set<string>>(new Set());
    const [disabledLetters, setDisabledLetters] = useState<string[]>([])
    const correctWord = "RIGHT";

    useEffect(() => {
        generateWordsSet().then((words) => {
            setWordSet(words.wordSet);
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
        let currWord: string = "";
        for(let i = 0; i < 5; i++){
            currWord += board[currAttempt.attempt][i];
        }
        
        if(wordSet.has(currWord.toLowerCase())){
            setCurrAttempt({attempt: currAttempt.attempt+1, letterPos: 0})
        }
        else alert("Word not Found");

        if(currWord === correctWord) alert("Game Ended")

    }

    return (
        <div>
            <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectKey: onSelectKey, onDelete, onEnter, correctWord, setDisabledLetters, disabledLetters}}>
            <div className="game">
                <Board />
                <Keyboard />
            </div>
            </AppContext.Provider>
        </div>
    )
}