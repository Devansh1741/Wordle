export type BoardDefaultType = Array<Array<string>>;
export const boardDefault = [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
]

export const generateWordsSet = async () : Promise<{ wordSet: Set<string> }> => {
    let wordSet: Set<string> = new Set();
    
    await fetch('/wordle_Bank.txt').then((response) => response.text()).then((result) => {
        const wordArr = result.split('\n')
        .map(word => word.trim())
        .filter(word => word !== '');
        wordSet = new Set(wordArr);
    })

    return {wordSet};
}