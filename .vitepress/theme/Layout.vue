<script setup>
import DefaultTheme from "vitepress/theme";
import ReaderTools from "./components/ReaderTools.vue";

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <ReaderTools />
    </template>
  </Layout>
</template>
