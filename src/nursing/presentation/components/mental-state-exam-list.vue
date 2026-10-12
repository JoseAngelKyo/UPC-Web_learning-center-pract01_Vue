<script setup>
import { onMounted } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import PvCard from 'primevue/card';
import useNursingStore from '../../application/nursing.store.js';

const { t, locale } = useI18n();
const store = useNursingStore();
const { examCount, highestScore, lowestScore, averageScore,
    mentalStateExamsLoading, mentalStateExamsLoaded } = storeToRefs(store);

onMounted(() => store.fetchMentalStateExams());

function formatScore(value) {
    return value === null ? t('common.no-data')
        : new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(value);
}
</script>

<template>
    <section aria-labelledby="analytics-title" :aria-busy="mentalStateExamsLoading">
        <pv-card>
            <template #title>
                <h2 id="analytics-title" class="m-0 text-xl">
                    {{ t('mental-state-exam-analytics.title') }}
                </h2>
            </template>
            <template #subtitle>{{ t('mental-state-exam-analytics.subtitle') }}</template>
            <template #content>
                <p v-if="mentalStateExamsLoading" role="status">{{ t('common.loading') }}</p>
                <p v-else-if="!mentalStateExamsLoaded" role="alert">
                    {{ t('errors.load-mental-state-exams') }}
                </p>
                <div v-else>
                    <p>{{ t('mental-state-exam-analytics.exam-count') }}: <strong>{{ examCount }}</strong></p>
                    <p>{{ t('mental-state-exam-analytics.highest-score') }}: <strong>{{ formatScore(highestScore) }}</strong></p>
                    <p>{{ t('mental-state-exam-analytics.lowest-score') }}: <strong>{{ formatScore(lowestScore) }}</strong></p>
                    <p>{{ t('mental-state-exam-analytics.average-score') }}: <strong>{{ formatScore(averageScore) }}</strong></p>
                </div>
            </template>
        </pv-card>
    </section>
</template>
