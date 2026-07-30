import {
  FaUserDoctor,
  FaVideo,
  FaTruckMedical,
  FaPaw,
} from "react-icons/fa6";

import {
  GiMedicines,
  GiMicroscope,
} from "react-icons/gi";

export const services = [
  {
    id: 1,
    title: "In-Person Consultation",
    description: "Book appointments with experienced doctors near you.",
    icon: FaUserDoctor,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: false,
  },
  {
    id: 2,
    title: "Online Consultation",
    description: "Consult certified doctors through secure video calls.",
    icon: FaVideo,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: true,
  },
  {
    id: 3,
    title: "Surgery",
    description: "Get access to trusted surgeons and hospitals.",
    icon: FaTruckMedical,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: false,
  },
  {
    id: 4,
    title: "Order Medicines",
    description: "Fast medicine delivery to your doorstep.",
    icon: GiMedicines,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: false,
  },
  {
    id: 5,
    title: "Lab Test",
    description: "Book lab tests with home sample collection.",
    icon: GiMicroscope,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: true,
  },
  {
    id: 6,
    title: "Pet Care",
    description: "Veterinary consultations and pet healthcare.",
    icon: FaPaw,
    color: "bg-slate-100",
    iconColor: "text-slate-900",
    free: false,
  },
];