import axios from "axios";
import api from "./axios";

const EXPO_PUBLIC_PROJECT_ID = process.env.EXPO_PUBLIC_PROJECT_ID;

const addWord = async (wordDetails, authToken) => {
  try {
    const response = await api.post(
      `${EXPO_PUBLIC_PROJECT_ID}/${wordDetails.word}.json?auth=${authToken}`,
      { ...wordDetails }
    );

    return response;
  } catch (error) {
    console.log("addWord error", error);
    throw error;
  }
};

const checkWord = async (word, authToken) => {
  try {
    const response = await api.get(
      `${EXPO_PUBLIC_PROJECT_ID}/${word}.json?auth=${authToken}`
    );
    return response;
  } catch (error) {
    console.log("checkWord error", error);
    throw error;
  }
};

const shuffleArray = (array) => {
  let arr = [...array];

  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }

  return arr;
};

export async function fetchAllWords(authToken) {
  try {
    const response = await api.get(
      `${EXPO_PUBLIC_PROJECT_ID}.json?auth=${authToken}`
    );
    const words = Object.keys(response.data).map((word) => ({
      ...Object.values(response.data[word])[0],
    }));
    return shuffleArray(words);
  } catch (error) {
    console.log("fetchAllWords error", error);
    throw error;
  }
}

export async function fetchDefinition(word, authToken) {
  try {
    const checkWordResponse = await checkWord(word, authToken);
    if (checkWordResponse.data) {
      throw new Error("Word already exists");
    }
    const response = await axios.get(
      `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
    );

    const data = response.data;

    if (!data[0]) {
      throw new Error("Word not found");
    }

    const definitions = [];
    const synonyms = new Set();
    const antonyms = new Set();

    data[0].meanings.forEach((meaning) => {
      meaning.definitions.forEach((def) => {
        const definition = {
          definition: def.definition,
          example: def.example,
        };
        definitions.push(definition);
      });
      meaning.synonyms.forEach((synonym) => {
        synonyms.add(synonym);
      });
      meaning.antonyms.forEach((antonym) => {
        antonyms.add(antonym);
      });
    });

    const formattedDefinition = {
      word: data[0].word,
      definitions,
      synonyms: Array.from(synonyms),
      antonyms: Array.from(antonyms),
    };

    await addWord(formattedDefinition, authToken);
    return formattedDefinition;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
}
