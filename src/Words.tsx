export type BoardDefaultType = Array<Array<string>>;
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const generateWordsSet = async () : Promise<{ wordSet: Set<string>, todaysWord: string }> => {
    let wordSet: Set<string> = new Set();
    let todaysWord: string = "";
    
    await fetch('/wordle_Bank.txt').then((response) => response.text()).then((result) => {
        const wordArr = result.split('\n')
        .map(word => word.trim())
        .filter(word => word !== '');

        todaysWord = wordArr[Math.floor(Math.random() * wordArr.length)]
        wordSet = new Set(wordArr);
    })

    return {wordSet, todaysWord};
}