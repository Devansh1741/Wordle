import { useContext } from "react";
import { AppContext } from "../pages/Home";

export const Key = ({keyVal, bigKey} : {keyVal: string, bigKey:boolean}) => {
    const {onSelectKey, onEnter, onDelete} = useContext(AppContext);

    const selectKey = () => {
        if(keyVal === "ENTER"){
            onEnter();
        }
        else if(keyVal === "DELETE"){
            onDelete();
        }
        else{
            onSelectKey(keyVal);
        }
    }

    return <div className="key" id={bigKey ? "big":""} onClick={selectKey}>{keyVal}</div>
}