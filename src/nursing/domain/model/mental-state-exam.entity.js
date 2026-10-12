
export class MentalStateExam {
    constructor({ id = null, patientId = null, examinerId = null, examDate = "", orientationScore = 0, registrationScore = 0,
                    attentionAndCalculationScore = 0, recallScore = 0, languageScore = 0 } = {})
    {
        this.id = id;
        this.patientId = patientId;
        this.examinerId = examinerId;
        this.examDate = examDate;
        this.orientationScore = orientationScore;
        this.registrationScore = registrationScore;
        this.attentionAndCalculationScore = attentionAndCalculationScore;
        this.recallScore = recallScore;
        this.languageScore = languageScore;
    }

    get totalScore() {
        return this.orientationScore
            + this.registrationScore
            + this.attentionAndCalculationScore
            + this.recallScore
            + this.languageScore;
    }
}