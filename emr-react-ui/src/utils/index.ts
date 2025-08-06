import { SOAPFormData } from "@/components/soap-note-form";

export const stringifyObjective = (objective: SOAPFormData['objective']): string => {

    const { vitalSigns, physicalExam, labResults } = objective;
    const vitalSignsStr = `
        Vital Signs:
        - Temperature: ${vitalSigns.temperature}
        - Blood Pressure: ${vitalSigns.bloodPressure}
        - Heart Rate: ${vitalSigns.heartRate}
        - Respiratory Rate: ${vitalSigns.respiratoryRate}
        - Oxygen Saturation: ${vitalSigns.oxygenSaturation}
    `;
    return `
        ${vitalSignsStr}
        Physical Exam:
        ${physicalExam}
        Lab Results:
        ${labResults}
    `;
}