<script setup>
import { computed, onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import PvSelect from 'primevue/select';
import PvButton from 'primevue/button';
import useNursingStore from '../../application/nursing.store.js';

const { t } = useI18n();
const router = useRouter();
const store = useNursingStore();

const {
  examiners,
  mentalStateExams,
  examinersLoading,
  mentalStateExamsLoading,
  examinersLoaded,
  mentalStateExamsLoaded
} = storeToRefs(store);

const selectedExamId = ref(null);
const selectedExaminerId = ref(null);
const saving = ref(false);
const errorMessage = ref('');

const selectedExam = computed(() => {
  return mentalStateExams.value.find(
      exam => exam.id === selectedExamId.value
  );
});

const examinerOptions = computed(() => {
  return examiners.value.map(examiner => ({
    label: examiner.fullName,
    value: examiner.id
  }));
});

const examOptions = computed(() => {
  return mentalStateExams.value.map(exam => ({
    label: `${t('assignment.exam')} ${exam.id}`,
    value: exam.id
  }));
});

const canAssign = computed(() => {
  return selectedExam.value
      && selectedExaminerId.value !== null
      && String(selectedExam.value.examinerId)
      !== String(selectedExaminerId.value);
});

onMounted(() => {
  store.fetchExaminers();
  store.fetchMentalStateExams();
});

function resetExaminer() {
  selectedExaminerId.value = null;
  errorMessage.value = '';
}

async function assignExam() {
  if (!canAssign.value || saving.value) {
    return;
  }

  saving.value = true;
  errorMessage.value = '';

  try {
    await store.assignMentalStateExam(
        selectedExam.value.id,
        selectedExaminerId.value
    );
  } catch {
    errorMessage.value = t('assignment.save-error');
    saving.value = false;
    return;
  }

  saving.value = false;
  router.push('/home');
}
</script>

<template>
  <section class="p-4" aria-labelledby="assignment-title">
    <h1 id="assignment-title">
      {{ t('assignment.title') }}
    </h1>

    <p v-if="examinersLoading || mentalStateExamsLoading" role="status">
      {{ t('common.loading') }}
    </p>

    <p v-else-if="!examinersLoaded" role="alert">
      {{ t('errors.load-examiners') }}
    </p>

    <p v-else-if="!mentalStateExamsLoaded" role="alert">
      {{ t('errors.load-mental-state-exams') }}
    </p>

    <form v-else @submit.prevent="assignExam">
      <div class="field">
        <label for="exam">
          {{ t('assignment.exam') }}
        </label>

        <pv-select
            input-id="exam"
            v-model="selectedExamId"
            :options="examOptions"
            option-label="label"
            option-value="value"
            :placeholder="t('assignment.select-exam')"
            :disabled="saving"
            class="w-full"
            @update:model-value="resetExaminer"
        />
      </div>

      <div v-if="selectedExam" class="mb-4">
        <p>
          {{ t('assignment.patient-id') }}:
          {{ selectedExam.patientId }}
        </p>

        <p>
          {{ t('assignment.current-examiner') }}:
          {{
            examiners.find(
                examiner =>
                    String(examiner.id)
                    === String(selectedExam.examinerId)
            )?.fullName ?? t('common.no-data')
          }}
        </p>

        <p>
          {{ t('assignment.total-score') }}:
          {{ selectedExam.totalScore }}
        </p>
      </div>

      <div class="field">
        <label for="examiner">
          {{ t('assignment.new-examiner') }}
        </label>

        <pv-select
            input-id="examiner"
            v-model="selectedExaminerId"
            :options="examinerOptions"
            option-label="label"
            option-value="value"
            :placeholder="t('assignment.select-examiner')"
            :disabled="!selectedExam || saving"
            class="w-full"
        />
      </div>

      <p v-if="errorMessage" role="alert">
        {{ errorMessage }}
      </p>

      <div class="flex gap-2">
        <pv-button
            type="submit"
            :label="t('assignment.assign')"
            :loading="saving"
            :disabled="!canAssign || saving"
        />

        <pv-button
            type="button"
            :label="t('assignment.cancel')"
            severity="secondary"
            :disabled="saving"
            @click="router.push('/home')"
        />
      </div>
    </form>
  </section>
</template>