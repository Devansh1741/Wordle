export type BoardDefaultType = Array<Array<string>>;
export const boardSkeleton = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]
let wordArr: string[] = [];
export const RandomWord = (): string => {
    return wordArr[Math.floor(Math.random() * wordArr.length)].toUpperCase();
}

export const generateWordsSet = async () : Promise<{ wordSet: Set<string>, todaysWord: string }> => {
    let wordSet: Set<string> = new Set();
    let todaysWord: string = "";

    
    await fetch('/wordle_Bank.txt').then((response) => response.text()).then((result) => {
        wordArr = result.split('\n')
        .map(word => word.trim())
        .filter(word => word !== '');

        todaysWord = RandomWord();
        wordSet = new Set(wordArr);
    })

    return {wordSet, todaysWord};
}