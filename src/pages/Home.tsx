import { useState, createContext, SetStateAction, Dispatch } from "react";
import { Board } from "../components/Board"
import { Keyboard } from "../components/Keyboard"
import { BoardDefaultType, boardDefault } from "../Words";

interface BoardContextType {
    board: BoardDefaultType;
    setBoard: Dispatch<SetStateAction<BoardDefaultType>>;
    currAttempt: AttemptType,
    setCurrAttempt: Dispatch<SetStateAction<AttemptType>>;
    onSelectKey: (keyVal: string) => void;
    onDelete: () => void;
    onEnter: () => void;
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
    onEnter: () => {}
    });

export const Home = () => {
    const [board, setBoard] = useState<BoardDefaultType>(boardDefault);
    const [currAttempt, setCurrAttempt] = useState<AttemptType>({attempt: 0, letterPos: 0});

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
        setCurrAttempt({attempt: currAttempt.attempt+1, letterPos: 0})
    }

    return (
        <div>
            <AppContext.Provider value={{board, setBoard, currAttempt, setCurrAttempt, onSelectKey: onSelectKey, onDelete, onEnter}}>
            <div className="game">
                <Board />
                <Keyboard />
            </div>
            </AppContext.Provider>
        </div>
    )
}