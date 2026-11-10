import inPersonImg from "../../assets/images/1.png";
import labTestImg from "../../assets/images/2.png";
import onlineConsultImg from "../../assets/images/3.png";
import surgeryImg from "../../assets/images/4.png";
import medicineImg from "../../assets/images/5.png";
import petCareImg from "../../assets/images/pet-care.jpg";

export const SERVICE_CATEGORIES = [
  "All Services",
  "Consultations",
  "Diagnostics & Pharmacy",
  "Specialty Care",
];

export const services = [
  {
    id: 1,
    title: "In-Person Consultation",
    category: "Consultations",
    description:
      "Book priority clinic visits with verified physicians and specialists near you—skip waiting room queues.",
    image: inPersonImg,
    badge: "FREE First Visit",
    perk: "Same-day clinic slots",
    accent: "from-amber-500/15 to-lime-500/10",
    free: true,
  },
  {
    id: 2,
    title: "Online Consultation",
    category: "Consultations",
    description:
      "Connect face-to-face over HD video within 10 minutes and receive signed digital e-prescriptions.",
    image: onlineConsultImg,
    badge: "24/7 Video",
    perk: "10-min avg. wait",
    accent: "from-emerald-500/15 to-teal-500/10",
    free: false,
  },
  {
    id: 3,
    title: "Surgery & Second Opinion",
    category: "Specialty Care",
    description:
      "Transparent surgical planning, hospital coordination, and dedicated care coordinators from pre-op to recovery.",
    image: surgeryImg,
    badge: "FREE Care Desk",
    perk: "Top partner hospitals",
    accent: "from-rose-500/15 to-pink-500/10",
    free: true,
  },
  {
    id: 4,
    title: "Order Medicines",
    category: "Diagnostics & Pharmacy",
    description:
      "Authentic pharmacist-verified prescriptions and cold-chain essentials delivered straight to your doorstep.",
    image: medicineImg,
    badge: "60-Min Express",
    perk: "Zero delivery on ₹199+",
    accent: "from-sky-500/15 to-cyan-500/10",
    free: true,
  },
  {
    id: 5,
    title: "Lab Tests at Home",
    category: "Diagnostics & Pharmacy",
    description:
      "Morning sterile home sample collection by trained phlebotomists with NABL-certified digital PDFs in 12 hours.",
    image: labTestImg,
    badge: "Up to 50% OFF",
    perk: "NABL accredited labs",
    accent: "from-cyan-500/15 to-blue-500/10",
    free: true,
  },
  {
    id: 6,
    title: "Veterinary & Pet Care",
    category: "Specialty Care",
    description:
      "Stress-free online veterinary consultations, preventive vaccination schedules, and nutrition care for dogs & cats.",
    image: petCareImg,
    badge: "FREE Triage",
    perk: "Licensed vet doctors",
    accent: "from-sky-500/15 to-indigo-500/10",
    free: true,
  },
];
