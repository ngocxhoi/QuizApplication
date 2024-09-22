<template>
  <h2 class="text-3xl mb-4 text-[#cecece] font-semibold">
    {{ question }}
  </h2>

  <ul class="flex flex-col gap-4">
    <li
      v-for="(option, index) in options"
      :key="option"
      class="border border-transparent relative"
      @click="handleAnswer(index)"
    >
      <label class="container-check">
        <input type="radio" name="option" :checked="chosen == index" />
        <span class="checkmark"></span>
        <span class="text-check">{{ option }}</span>
      </label>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  question: string;
  options: string[];
  chosen: number | undefined;
}>();

const emit = defineEmits<{
  (event: "answer", index: number): void;
}>();

function handleAnswer(index: number) {
  emit("answer", index);
}
</script>

<style scoped>
.container-check {
  display: block;
  position: relative;
  padding-left: 35px;
  margin-bottom: 12px;
  cursor: pointer;
  font-size: 22px;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

/* Hide the browser's default radio button */
.container-check input {
  position: absolute;
  opacity: 0;
  cursor: pointer;
}

/* Create a custom radio button */
.checkmark {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 0;
  height: 25px;
  width: 25px;
  background-color: #eee;
  border-radius: 50%;
}

/* On mouse-over, add a grey background color */
.container-check:hover input ~ .checkmark {
  background-color: #ccc;
}

/* When the radio button is checked, add a blue background */
.container-check input:checked ~ .checkmark {
  background-color: var(--primary-color);
}
.container-check input:checked ~ .text-check {
  color: var(--primary-color);
}

/* Create the indicator (the dot/circle - hidden when not checked) */
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}

/* Show the indicator (dot/circle) when checked */
.container-check input:checked ~ .checkmark:after {
  display: block;
}

/* Style the indicator (dot/circle) */
.container-check .checkmark:after {
  top: 9px;
  left: 9px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: white;
}
</style>
