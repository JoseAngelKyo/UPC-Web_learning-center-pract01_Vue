<script setup>
import { useI18n } from 'vue-i18n';
import PvCard from 'primevue/card';
const { t, locale } = useI18n();
defineProps({ performance: { type: Object, required: true } });
function formatScore(value) {
    return value === null ? t('common.no-data')
        : new Intl.NumberFormat(locale.value, { maximumFractionDigits: 2 }).format(value);
}
</script>

<template>
    <pv-card class="h-full">
        <template #header>
            <h2 class="px-3 pt-3 m-0 text-xl">{{ performance.examiner.fullName }}</h2>
        </template>
        <template #title>
            {{ t('examiner-performance-overview.npi') }}
            {{ performance.examiner.nationalProviderIdentifier }}
        </template>
        <template #subtitle>{{ t('examiner-performance-overview.subtitle') }}</template>
        <template #content>
            <p>
                {{ t('examiner-performance-overview.assigned-exam-count') }}:
                <strong>{{ performance.assignedExamCount }}</strong>
            </p>
            <p>
                {{ t('examiner-performance-overview.average-assigned-exam-total-score') }}:
                <strong>{{ formatScore(performance.averageAssignedExamTotalScore) }}</strong>
            </p>
        </template>
    </pv-card>
</template>
