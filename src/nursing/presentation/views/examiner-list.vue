<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import useNursingStore from '../../application/nursing.store.js';
import ExaminerCard from '../components/examiner-card.vue';

const { t } = useI18n();
const store = useNursingStore();
const { examinerPerformance, examinersLoading, mentalStateExamsLoading,
    examinersLoaded, mentalStateExamsLoaded } = storeToRefs(store);

onMounted(() => {
    store.fetchExaminers();
    store.fetchMentalStateExams();
});
</script>

<template>
    <section class="p-4" aria-labelledby="examiner-title"
        :aria-busy="examinersLoading || mentalStateExamsLoading">
        <h1 id="examiner-title">{{ t('examiner-performance-overview.title') }}</h1>
        <p v-if="examinersLoading || mentalStateExamsLoading" role="status">{{ t('common.loading') }}</p>
        <p v-else-if="!examinersLoaded" role="alert">{{ t('errors.load-examiners') }}</p>
        <p v-else-if="!mentalStateExamsLoaded" role="alert">{{ t('errors.load-mental-state-exams') }}</p>
        <p v-else-if="examinerPerformance.length === 0">{{ t('examiner-performance-overview.empty') }}</p>
        <div v-else class="grid">
            <div v-for="item in examinerPerformance" :key="item.examiner.id" class="col-12 md:col-6">
                <examiner-card :performance="item" />
            </div>
        </div>
    </section>
</template>
