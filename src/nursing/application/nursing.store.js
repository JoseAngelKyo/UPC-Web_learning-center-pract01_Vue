import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { NursingApi } from '../infrastructure/nursing-api.js';
import { ExaminerAssembler } from '../infrastructure/examiner.assembler.js';
import { MentalStateExamAssembler } from '../infrastructure/mental-state-exam.assembler.js';

const nursingApi = new NursingApi();

const useNursingStore = defineStore('nursing', () => {
    const examiners = ref([]);
    const mentalStateExams = ref([]);
    const errors = ref([]);

    const examinersLoaded = ref(false);
    const mentalStateExamsLoaded = ref(false);

    const examinersLoading = ref(false);
    const mentalStateExamsLoading = ref(false);

    function fetchExaminers() {
        if (examinersLoaded.value || examinersLoading.value) {
            return;
        }

        examinersLoading.value = true;

        return nursingApi.getExaminers()
            .then(response => {
                examiners.value =
                    ExaminerAssembler.toEntitiesFromResponse(response);

                examinersLoaded.value = true;
            })
            .catch(error => {
                errors.value.push({
                    messageKey: 'errors.load-examiners',
                    detail: error.message
                });
            })
            .finally(() => {
                examinersLoading.value = false;
            });
    }

    function fetchMentalStateExams() {
        if (
            mentalStateExamsLoaded.value ||
            mentalStateExamsLoading.value
        ) {
            return;
        }

        mentalStateExamsLoading.value = true;

        return nursingApi.getMentalStateExams()
            .then(response => {
                mentalStateExams.value =
                    MentalStateExamAssembler.toEntitiesFromResponse(response);

                mentalStateExamsLoaded.value = true;
            })
            .catch(error => {
                errors.value.push({
                    messageKey: 'errors.load-mental-state-exams',
                    detail: error.message
                });
            })
            .finally(() => {
                mentalStateExamsLoading.value = false;
            });
    }

    const examCount = computed(() => {
        return mentalStateExams.value.length;
    });

    const highestScore = computed(() => {
        if (examCount.value === 0) {
            return null;
        }

        return mentalStateExams.value.reduce(
            (highest, exam) => Math.max(highest, exam.totalScore),
            mentalStateExams.value[0].totalScore
        );
    });

    const lowestScore = computed(() => {
        if (examCount.value === 0) {
            return null;
        }

        return mentalStateExams.value.reduce(
            (lowest, exam) => Math.min(lowest, exam.totalScore),
            mentalStateExams.value[0].totalScore
        );
    });

    function calculateAverageScore(exams) {
        if (exams.length === 0) {
            return null;
        }

        const total = exams.reduce(
            (sum, exam) => sum + exam.totalScore,
            0
        );

        return total / exams.length;
    }

    const averageScore = computed(() => {
        return calculateAverageScore(mentalStateExams.value);
    });

    function getExamsByExaminerId(examinerId) {
        return mentalStateExams.value.filter(
            exam => String(exam.examinerId) === String(examinerId)
        );
    }

    const examinerPerformance = computed(() => {
        return examiners.value.map(examiner => {
            const assignedExams = getExamsByExaminerId(examiner.id);

            return {
                examiner,
                assignedExamCount: assignedExams.length,
                averageAssignedExamTotalScore:
                    calculateAverageScore(assignedExams)
            };
        });
    });

    function clearErrors() {
        errors.value = [];
    }


    async function assignMentalStateExam(examId, examinerId) {
        const exam = mentalStateExams.value.find(
            item => String(item.id) === String(examId)
        );

        const examiner = examiners.value.find(
            item => String(item.id) === String(examinerId)
        );

        if (!exam || !examiner || String(exam.examinerId) === String(examiner.id)) {
            throw new Error('Exam or examiner not found');
        }

        const resource = {
            ...exam,
            examinerId: examiner.id
        };

        const response = await nursingApi.updateMentalStateExam(resource);

        const updatedExam =
            MentalStateExamAssembler.toEntityFromResource(response.data);

        const index = mentalStateExams.value.findIndex(
            item => String(item.id) === String(updatedExam.id)
        );

        if (index !== -1) {
            mentalStateExams.value[index] = updatedExam;
        }
    }

    return {
        assignMentalStateExam,
        examiners,
        mentalStateExams,
        errors,
        examinersLoaded,
        mentalStateExamsLoaded,

        examinersLoading,
        mentalStateExamsLoading,

        fetchExaminers,
        fetchMentalStateExams,

        examCount,
        highestScore,
        lowestScore,
        averageScore,
        getExamsByExaminerId,
        examinerPerformance,
        clearErrors
    };
});

export default useNursingStore;
