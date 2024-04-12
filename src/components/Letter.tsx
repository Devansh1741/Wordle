import { useContext } from 'react'
import { AppContext } from '../pages/Home'


interface Props {
    letterPos: number,
    attemptVal: number
}

export const Letter = ({letterPos, attemptVal}: Props) => {
    const {board} = useContext(AppContext);
    const letter = board[attemptVal][letterPos];
    return <div className="letter"> {letter} </div>
}