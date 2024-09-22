<template>
  <div class="container max-w-3xl mx-auto">
    <Slogan />

    <div
      class="flex flex-col gap-4 border p-8 w-full my-10 text-gray-400 font-semibold text-lg"
    >
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Username : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.username }}
        </div>
      </div>
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Level : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.level }}
        </div>
      </div>
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Total Questions : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.questions }}
        </div>
      </div>
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Total Quiz Points : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.points }}
        </div>
      </div>
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Total Attempts : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.attempts }}
        </div>
      </div>
      <div class="flex items-center justify-between w-full hover:text-gray-200">
        <span>Quiz Results : </span>
        <div class="font-bold">
          {{ historyPlay[historyPlay.length - 1]?.results }}
        </div>
      </div>
    </div>

    <div class="mx-auto flex gap-4">
      <UButton @click="handleRestart()" label="Restart" />
      <UButton @click="handleRetry()" label="Retry" />
    </div>

    <div v-if="historyPlay.length > 0" class="mt-10">
      <UTable :rows="historyPlay" />
    </div>
  </div>
</template>

<script setup lang="ts">
enum Results {
  Passed = "Passed",
  Failed = "Failed",
}
interface HistoryPlay {
  username?: string;
  level?: string;
  questions?: number;
  attempts?: number;
  points?: number;
  results?: Results;
}

useSeoMeta({
  title: "Results",
});

const { resetQuiz, tryAgain } = useDataState();
const historyPlay = ref<HistoryPlay[]>([]);

onMounted(async () => {
  const { data } = await useFetch("/api/db/get/historyPlay");
  historyPlay.value = (data.value as HistoryPlay[]) ?? [];
});

function handleRestart() {
  resetQuiz();
  navigateTo("/");
}
function handleRetry() {
  tryAgain();
  navigateTo("/quiz");
}
</script>

<style></style>
