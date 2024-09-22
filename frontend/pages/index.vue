<template>
  <UContainer>
    <Slogan />

    <ol
      class="[&>li]:text-2xl [&>li]:text-[#cecece] list-decimal w-fit mx-auto my-10"
    >
      <li>Bạn sẽ được hỏi 10 câu hỏi trong một lần làm quiz.</li>
      <li>10 điểm sẽ được cộng với mỗi câu trả lời đúng.</li>
      <li>
        Bạn có thể xem lại câu hỏi và sửa đáp án trước khi hoàn thành quiz.
      </li>
      <li>Câu trả lời sẽ được hiển thị sau khi hoàn thành.</li>
    </ol>

    <form
      id="form"
      @submit.prevent="handleSubmit()"
      class="flex flex-col items-center justify-center mt-10 mx-auto"
    >
      <label for="topic" class="mt-10">Topic</label>
      <input
        id="topic"
        type="text"
        v-model="topic"
        required
        placeholder="Chủ đề bạn muốn chơi"
        class="px-4 py-2 mb-4 w-1/2 rounded-xl text-lg bg-white text-black"
      />
      <div class="my-4 text-center flex flex-col">
        <label for="user" class="text-lg mb-2">Người chơi</label>
        <USelect
          v-if="userList?.length"
          v-model="username"
          :options="userList"
        />
        <input
          v-else
          @click="callUsers()"
          type="button"
          value="Select an user"
          id="user"
          class="bg-red-400 px-3 py-1 rounded cursor-pointer focus:outline-blue-400"
        />
      </div>

      <div class="my-4">
        <h1 class="text-lg mb-2">Chọn mức độ bạn muốn</h1>
        <USelect v-model="levelSelected" :options="levelArr" />
      </div>

      <div class="flex gap-4">
        <button
          @click="isOpen = true"
          class="p-[0.2em_1.7em] mt-10 border-none rounded-[0.1em] text-xl text-[#202020] bg-[#faff5a] flex items-center justify-center w-fit mx-auto"
        >
          Create User
        </button>
        <button
          :disabled="username == '' || topic == ''"
          type="submit"
          class="p-[0.2em_1.7em] mt-10 border-none rounded-[0.1em] text-xl text-[#202020] bg-[#faff5a] flex items-center justify-center w-fit mx-auto"
        >
          Start Quiz
        </button>
      </div>
    </form>
  </UContainer>

  <UModal v-model="isOpen" prevent-close>
    <UCard
      :ui="{
        ring: '',
        divide: 'divide-y divide-gray-100 dark:divide-gray-800',
      }"
    >
      <template #header>
        <div class="flex items-center w-full justify-between">
          <h1 class="text-red-400 font-semibold text-xl">Create User</h1>
          <div class="cursor-pointer">
            <Icon @click="isOpen = false" name="heroicons:x-mark" size="20" />
          </div>
        </div>
      </template>

      <div>
        <UInput v-model="usernameCreate" />
      </div>

      <template #footer>
        <div class="w-full flex items-center justify-center">
          <UButton @click="handleCreateUser()" label="Create User" />
        </div>
      </template>
    </UCard>
  </UModal>
</template>

<script setup lang="ts">
useSeoMeta({
  title: "Home",
});

const { isLoading, username, level, quiz, quizId, userList } = useDataState();
const levelArr = ["Beginner", "Intermediate", "Advanced", "Expert"];

const levelSelected = ref(level.value);
const topic = ref("");
const isOpen = ref(false);
const usernameCreate = ref("");

async function handleSubmit() {
  try {
    isLoading.value = true;
    const { data } = await useFetch("/api/db/create/question", {
      method: "POST",
      body: {
        topic: topic.value,
        level: levelSelected.value,
      },
    });

    quiz.value = JSON.parse(data.value?.question ?? "[]");
    quizId.value = data.value?.id ?? "";
    navigateTo("/quiz");
  } catch (error) {
    console.log(error);
  } finally {
    isLoading.value = false;
  }
}

async function handleCreateUser() {
  try {
    const { data } = await useFetch("/api/db/upload/user", {
      method: "POST",
      body: {
        username: usernameCreate.value,
      },
    });

    if (data.value) {
      userList.value?.push(data.value);
      username.value = data.value;
    }
  } catch (error) {
    console.log(error);
  } finally {
    isOpen.value = false;
  }
}

async function callUsers() {
  const { data } = await useFetch("/api/db/get/user", {
    method: "get",
  });

  userList.value = data.value;
}
</script>

<style></style>
