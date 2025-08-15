export const fetchDefinition = async (word) => {
  const response = await fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch definition");
  }

  const data = await response.json();

  if (!data[0]) {
    throw new Error("Word not found");
  }

  const definitions = [];
  const synonyms = [];
  const antonyms = [];

  data[0].meanings.forEach((meaning) => {
    meaning.definitions.forEach((def) => {
      const definition = {
        definition: def.definition,
        example: def.example,
      };
      definitions.push(definition);
    });
    synonyms.push(...meaning.synonyms);
    antonyms.push(...meaning.antonyms);
  });

  const formattedDefinition = {
    word: data[0].word,
    definitions,
    synonyms,
    antonyms,
  };

  return formattedDefinition;
};
