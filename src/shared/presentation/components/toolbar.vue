<script setup>
import { useI18n } from 'vue-i18n';
import PvToolbar from 'primevue/toolbar';
import LanguageSwitcher from './language-switcher.vue';

const { t } = useI18n();
</script>

<template>
  <header>
    <pv-toolbar>
      <template #start>
        <div class="flex align-items-center gap-3">
          <img src="https://hign.org/sites/default/files/2022-01/HIGN-logo-1200.png" :alt="t('toolbar.logo-alt')" width="100"/>

          <span class="font-bold"> {{ t('toolbar.company-name') }}</span>
        </div>
      </template>

      <template #end>
        <div class="flex align-items-center gap-3 flex-wrap">
          <nav :aria-label="t('toolbar.navigation')" class="flex gap-3 flex-wrap">
            <router-link to="/home">
              {{ t('option.home') }}
            </router-link>

            <router-link to="/nursing/examiner-performance-overview"> {{ t('option.examiner-performance-overview') }} </router-link>
              <router-link to="/nursing/mental-state-exams/assignments/new">
              {{ t('assignment.title') }}
            </router-link>
          </nav>

          <language-switcher />
        </div>
      </template>
    </pv-toolbar>
  </header>
</template>
