<template>
  <ProgressBar :progress-data="progressData" :total-questions="quiz.length" />
  <div class="container max-w-3xl mx-auto">
    <Slogan />

    <div class="my-10">
      <Questions
        :question="quiz[currentQuestion].question"
        :options="quiz[currentQuestion].options"
        :chosen="quiz[currentQuestion].chosen"
        @answer="(index: number) => handleAnswer(index)"
      />
    </div>

    <div class="grid grid-cols-[auto_1fr_auto]">
      <UButton
        @click="handleNextQuestion(-1)"
        size="lg"
        :disabled="currentQuestion == 0"
        color="yellow"
        label="Prev"
      />
      <div></div>
      <UButton
        @click="handleNextQuestion(1)"
        size="lg"
        :disabled="currentQuestion == quiz.length"
        label="Next"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
interface HistoryPlay {
  username: string;
  level: string;
  questions: number;
  attempts: number;
  points: number;
  results: Results;
}

enum Results {
  Passed = "Passed",
  Failed = "Failed",
}

useSeoMeta({
  title: "Quiz",
});

const { username, level, quiz, quizId } = useDataState();
const currentQuestion = ref(0);
const progressData = ref(0);

async function handleNextQuestion(index: number) {
  if (currentQuestion.value < quiz.value.length - 1) {
    progressData.value += index;
    await useSleep();
    currentQuestion.value += index;
  } else {
    progressData.value += index;

    let totalValue = quiz.value.filter(
      (item) => item.chosen == item.answer
    ).length;

    const result: Results =
      (totalValue * 100) / quiz.value.length >= 80
        ? Results.Passed
        : Results.Failed;

    const historyPlay = {
      username: username.value,
      level: level.value,
      questions: quiz.value.length,
      attempts: totalValue,
      points: totalValue * 10,
      results: result,
    };
    await useSleep();
    await handleHistoryPlay(historyPlay, quizId.value);
    navigateTo("/results");
  }
}

function handleAnswer(index: number) {
  quiz.value[currentQuestion.value].chosen = index;
}

async function handleHistoryPlay(dataBody: HistoryPlay, quizId: string) {
  const data = await useFetch("/api/db/upload/historyPlay", {
    method: "POST",
    body: {
      ...dataBody,
      questionId: quizId,
    },
  });
}
</script>

<style></style>
