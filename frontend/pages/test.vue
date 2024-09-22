<template>
  <div class="text-3xl text-red-400">This is test page</div>
  <UInput v-model="topic" class="w-[400px] my-10" placeholder="Your topic" />
  <UButton :disabled="topic == ''" @click="getData">Get data</UButton>
  <pre class="text-yellow-500 mt-10">{{ dataRef }}</pre>
</template>

<script setup lang="ts">
const topic = ref("");
const dataRef = ref();

async function getData() {
  const { data } = await useFetch("/api/db/create/question", {
    method: "POST",
    body: {
      topic: topic.value,
    },
  });

  dataRef.value = data.value;
}
</script>

<style></style>
