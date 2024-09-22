<template>
  <div>
    <NuxtRouteAnnouncer />
    <div class="container h-screen mt-10 mx-auto">
      <NuxtPage />
    </div>
  </div>
  <UNotifications />
  <div
    v-if="isLoading"
    class="absolute w-full h-full top-0 left-0 bg-gray-500/90 text-5xl font-bold flex items-center justify-center"
  >
    Quizing ...
  </div>
</template>

<script setup lang="ts">
const appConfig = useAppConfig();

useHead({
  titleTemplate(title: string | undefined): any {
    return title ? `${title} | ${appConfig.title}` : appConfig.title;
  },
});

const { isLoading } = useDataState();
</script>
