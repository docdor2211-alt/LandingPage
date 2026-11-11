import {
  FaFilePrescription,
  FaHeartbeat,
  FaNotesMedical,
  FaStethoscope,
} from "react-icons/fa";

export const aiFeatures = [
  {
    id: 1,
    title: "Symptom Assistant",
    badge: "Instant Triage",
    description:
      "Describe symptoms naturally and receive structured questions, red-flag checks, and specialist guidance.",
    icon: FaStethoscope,
    iconBg: "bg-sky-500/15 text-sky-500",
    samplePrompt: "Mild fever (100.4°F) and sore throat since last evening — should I see a GP?",
    sampleResponse:
      "Likely viral upper respiratory symptoms. Stay hydrated, monitor temperature every 6 hrs, and book a quick General Physician video check if fever exceeds 102°F or lasts over 48 hrs.",
    nextAction: "Suggested Specialist: General Physician",
  },
  {
    id: 2,
    title: "E-Prescription Assistant",
    badge: "Dosage Clarity",
    description:
      "Scan or upload handwritten or digital prescriptions to clarify timing, food rules, and side-effect notes.",
    icon: FaFilePrescription,
    iconBg: "bg-emerald-500/15 text-emerald-500",
    samplePrompt: "Explain my doctor's Amoxicillin + Pantoprazole schedule cleanly.",
    sampleResponse:
      "Pantoprazole 40 mg: 1 tablet 30 mins before breakfast. Amoxicillin 500 mg: 1 capsule every 8 hrs after meals for the full 5-day course.",
    nextAction: "Medication Reminders Ready",
  },
  {
    id: 3,
    title: "Medical Report Analyzer",
    badge: "Plain-Language Lab Insights",
    description:
      "Upload CBC, thyroid, lipid, or HbA1c PDFs to get easy-to-read trend highlights before your visit.",
    icon: FaNotesMedical,
    iconBg: "bg-violet-500/15 text-violet-500",
    samplePrompt: "Summarize my CBC & Vitamin D blood panel flags.",
    sampleResponse:
      "Hemoglobin (13.6 g/dL) and Platelets are within normal range. Vitamin D (18 ng/mL) is mildly insufficient—discuss supplementation dosage with your doctor.",
    nextAction: "Prep 3 Questions for Your Doctor",
  },
  {
    id: 4,
    title: "Health Risk Assessment",
    badge: "Preventive Plan",
    description:
      "Receive tailored preventive screening reminders and daily micro-habits calibrated to your age and lifestyle.",
    icon: FaHeartbeat,
    iconBg: "bg-rose-500/15 text-rose-500",
    samplePrompt: "What annual checkup markers matter most at age 34 with desk work?",
    sampleResponse:
      "Recommended quarterly sleep & post-meal walk anchors plus annual Fasting Lipid Profile, HbA1c, Vitamin B12, and Liver Function panel.",
    nextAction: "20% Off Preventive Labs with Care Plan",
  },
];
