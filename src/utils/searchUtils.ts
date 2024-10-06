import { greeklishToGreekMap } from "../constants/letterMapping";

export const normalizeString = (text: string): string => {
  const withoutPunctuation = text.replace(
    /[.,\/#!$%\^&\*;:{}=?\-_`~()\s+]/g,
    '',
  );
  const wordNormalized = withoutPunctuation
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
  const wordLowerCase = wordNormalized.toUpperCase();
  return wordLowerCase;
};

export const toGreek = (text: string): string => {
  let regexString, regex;

  if (typeof text === 'string' && text.length > 0) {
    greeklishToGreekMap.forEach((replacementItem) => {
      regexString = replacementItem.find;
      regex = new RegExp(regexString, 'g');
      text = text.replace(regex, replacementItem.replace);
    });
  }
  return text;
};

/**
 * Phrase is the entity to search, search term is what the user is searching for
 * **/
export const searchOneTermOnOnePhrase = ({
  phrase,
  searchTerm,
}: {
  phrase: string;
  searchTerm: string;
}) => {
  if (!phrase || !searchTerm) {
    return true;
  }
  return (
    normalizeString(phrase).includes(normalizeString(searchTerm)) ||
    normalizeString(toGreek(phrase)).includes(
      normalizeString(toGreek(searchTerm)),
    )
  );
};

