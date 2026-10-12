import { BaseApi } from "../../shared/infrastructure/base-api.js";
import { BaseEndpoint} from "../../shared/infrastructure/base-endpoint.js";

const examinersEndpointPath = import.meta.env.VITE_EXAMINERS_ENDPOINT_PATH
const mentalStateExamsEndpointPath = import.meta.env.VITE_MENTAL_STATE_EXAMS_ENDPOINT_PATH

export class NursingApi extends BaseApi {
    #examinersEndpoint;
    #mentalStateExamsEndpoint;

    constructor() {
        super();
        this.#examinersEndpoint = new BaseEndpoint(this, examinersEndpointPath);
        this.#mentalStateExamsEndpoint = new BaseEndpoint(this, mentalStateExamsEndpointPath);
    };

    getExaminers() {
        return this.#examinersEndpoint.getAll();
    }

    getMentalStateExams() {
        return this.#mentalStateExamsEndpoint.getAll();
    }

    getExaminerById(id) {
        return this.#examinersEndpoint.getById(id);
    }

    getMentalStateExamById(id) {
        return this.#mentalStateExamsEndpoint.getById(id);
    }

    updateMentalStateExam(resource) {
        return this.#mentalStateExamsEndpoint.update(
            resource.id,
            resource
        );
    }
}