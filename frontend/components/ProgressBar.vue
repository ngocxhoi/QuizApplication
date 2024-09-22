<template>
  <div class="w-full bg-[--secondary] rounded-full h-2.5">
    <div
      class="bg-primary h-2 5 rounded-md transition-all duration-300 ease-in-out"
      :style="`width: ${progress}%`"
    />
  </div>
</template>

<script lang="ts" setup>
// const progressData = inject("progressData") as Ref<number>;
// const totalQuestions = inject("totalQuestions") as number;

const props = defineProps<{
  progressData: number;
  totalQuestions: number;
}>();

const { progressData, totalQuestions } = toRefs(props);

const progress = computed(
  () => (progressData.value / totalQuestions.value) * 100
);
</script>
