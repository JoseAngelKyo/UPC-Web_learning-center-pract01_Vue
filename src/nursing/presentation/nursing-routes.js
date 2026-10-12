const examinerList = () => import('./views/examiner-list.vue');
const mentalStateExamForm = () => import('./views/mental-state-exam-form.vue');

const nursingRoutes = [
    {
        path: 'examiner-performance-overview',
        name: 'nursing-examiner-performance-overview',
        component: examinerList,
        meta: { title: 'Examiner Performance Overview' }
    },
    {
        path: 'mental-state-exams/assignments/new',
        name: 'nursing-mental-state-exam-assignment',
        component: mentalStateExamForm,
        meta: { title: 'Assign Mental State Exam' }
    }
];

export default nursingRoutes;
