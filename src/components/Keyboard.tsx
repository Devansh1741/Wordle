import { useCallback, useContext, useEffect } from "react";
import { Key } from "./Key";
import { AppContext } from "../pages/Home";

export const Keyboard = () => {
    const {onSelectKey, onEnter, onDelete, disabledLetters} = useContext(AppContext);
    
    const keys1 = ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"];
    const keys2 = ["A", "S", "D", "F", "G", "H", "J", "K", "L"];
    const keys3 = ["Z", "X", "C", "V", "B", "N", "M"];

    const handleKeyboard = useCallback((event: KeyboardEvent) => {
        if(event.key.toLowerCase() === "enter"){
            onEnter();
        }
        else if (event.key.toLowerCase() === "backspace"){
            onDelete();
        }
        else{
            const allKeys = [...keys1, ...keys2, ...keys3];
            allKeys.forEach((key) => {
                if(event.key.toLowerCase() === key.toLowerCase()) onSelectKey(key);
            })
        }
    }, [[onSelectKey, onEnter, onDelete, keys1, keys2, keys3]])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyboard);

        return () => {
            document.removeEventListener("keydown", handleKeyboard);
        }
    }, [handleKeyboard])

    return <div>
        <div className="line1">{keys1.map((key) => {
            return <Key keyVal = {key} bigKey = {false} disabled = {disabledLetters.includes(key)}/>
        })}</div>
        <div className="line2">{keys2.map((key) => {
            return <Key keyVal = {key} bigKey = {false} disabled = {disabledLetters.includes(key)}/> 
            })}</div>
        <div className="line3">
            <Key keyVal = {"ENTER"} bigKey = {true} disabled = {false}/>
            {keys3.map((key) => 
                {return <Key keyVal = {key} bigKey = {false} disabled = {disabledLetters.includes(key)} />})}
            <Key keyVal = {"DELETE"} bigKey = {true} disabled = {false}/>
        </div>
    </div>
}