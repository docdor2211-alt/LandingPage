import  image from "../../assets/images/1.png"
import image1 from "../../assets/images/3.png"
import image2 from "../../assets/images/4.png"
import image3 from "../../assets/images/5.png"
import image4 from "../../assets/images/2.png"
import petImage from "../../assets/images/dog_de.png";

export const services = [
  {
    id: 1,
    title: "In-Person Consultation",
    // description: "Book appointments with experienced doctors near you.",
    image: image  ,
    color: "from-slate-100 to-slate-50",
    free: true,
    fullBackground: true,
  },
  {
    id: 2,
    title: "Online Consultation",
    // description: "Consult certified doctors through secure video calls.",
    image: image1,
    color: "from-cyan-100 to-sky-50",
    free: false,
    fullBackground: true,
  },
  {
    id: 3,
    title: "Surgery",
    // description: "Get access to trusted surgeons and hospitals.",
    image: image2,
    color: "from-pink-100 to-rose-50",
    free: true,
    fullBackground: true,
  },
  {
    id: 4,
    title: "Order Medicines",
    // description: "Fast medicine delivery to your doorstep.",
    image: image3,
    color: "from-sky-100 to-cyan-50",
    free: true,
    fullBackground: true,
  },
  {
    id: 5,
    title: "Lab Test",
    // description: "Book lab tests with home sample collection.",
    image: image4,
    color: "from-slate-100 to-slate-50",
    free: true,
    fullBackground: true,
  },
  {
    id: 6,
    title: "Pet Care",
    // description: "Veterinary consultations and pet healthcare.",
    image: image3,
    color: "from-blue-100 to-sky-50",
    free: true,
    fullBackground: true,
  },
];