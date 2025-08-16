import { createContext, useState } from "react";

export const WordsContext = createContext({
  words: [],
  setWords: () => {},
});

export function WordsContextProvider({ children }) {
  const [words, setWords] = useState([]);

  const getWord = () => {
    if (words.length === 0) {
      return null;
    }
    const word = words[0];
    setWords(words.slice(1));
    return word;
  };

  const value = {
    words,
    setWords,
    getWord,
  };

  return (
    <WordsContext.Provider value={value}>{children}</WordsContext.Provider>
  );
}
