import {
  FaStethoscope,
  FaFilePrescription,
  FaNotesMedical,
  FaHeartbeat,
} from "react-icons/fa";

export const aiFeatures = [
  {
    id: 1,
    title: "Symptom Assistant",
    description:
      "Describe your symptoms and receive AI-powered health insights instantly.",
    icon: FaStethoscope,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
  },
  {
    id: 2,
    title: "E-Prescription Assistant",
    description:
      "Upload prescriptions and understand medicines, dosage, and precautions.",
    icon: FaFilePrescription,
    color: "bg-green-100",
    iconColor: "text-green-600",
  },
  {
    id: 3,
    title: "Medical Report Analyzer",
    description:
      "Upload blood reports or scans and receive easy-to-understand summaries.",
    icon: FaNotesMedical,
    color: "bg-purple-100",
    iconColor: "text-purple-600",
  },
  {
    id: 4,
    title: "Health Risk Assessment",
    description:
      "Get personalized wellness recommendations based on your lifestyle.",
    icon: FaHeartbeat,
    color: "bg-red-100",
    iconColor: "text-red-500",
  },
];