interface Question {
  question: string;
  options: string[];
  answer: number;
  chosen?: number;
}

export const shuffleArray = (array: Question[]): Question[] => {
  array.map((item) => (item.chosen = undefined));
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};
