<script setup>
import AppToolbar from './toolbar.vue';
</script>

<template>
  <div>
    <app-toolbar />

    <main>
      <router-view />
    </main>
  </div>
</template>