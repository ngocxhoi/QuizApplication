enum Results {
  Passed = "Passed",
  Failed = "Failed",
}
interface HistoryPlay {
  username: string;
  level: string;
  questions: number;
  attempts: number;
  points: number;
  results: Results;
}
interface Question {
  question: string;
  options: string[];
  answer: number;
  chosen?: number;
}

export const useDataState = () => {
  const username = useState("username", () => "");
  const userList = useState<string[] | null>("userList", () => []);
  const level = useState("level", () => "Beginner");
  const historyPlay = useState<HistoryPlay[]>("historyPlay", () => []);
  const quiz = useState<Question[]>("quiz", () => []);
  const isLoading = useState<Boolean>("isLoading", () => false);
  const quizId = useState<string>("quizId", () => "");

  const resetUsername = () => {
    username.value = "";
  };

  const reQuiz = () => {
    quiz.value.map((item) => (item.chosen = undefined));
  };

  const resetQuiz = () => {
    username.value = "";
    quiz.value = [];
  };

  const tryAgain = () => {
    reQuiz();
    shuffleArray(quiz.value);
  };

  return {
    username,
    quizId,
    userList,
    isLoading,
    level,
    resetUsername,
    historyPlay,
    quiz,
    resetQuiz,
    tryAgain,
  };
};
