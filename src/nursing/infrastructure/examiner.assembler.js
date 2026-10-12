import { Examiner } from "../domain/model/examiner.entity.js"

export class ExaminerAssembler {
    static toEntityFromResource(resource) {
        return new Examiner({...resource});
    }

    static toEntitiesFromResponse(response) {
        if (response.status !== 200) {
            console.error('Error en ExaminerAssembler');
            return [];
        }

        const resources = Array.isArray(response.data)
            ? response.data
            : response.data['examiners'];

        return resources.map(resource =>
            this.toEntityFromResource(resource)
        );
    }
}