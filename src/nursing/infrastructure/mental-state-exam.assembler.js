import { MentalStateExam } from "../domain/model/mental-state-exam.entity.js";

export class MentalStateExamAssembler {
    static toEntityFromResource(resource) {
        return new MentalStateExam({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en MentalStateExamAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['mental-state-exams'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}