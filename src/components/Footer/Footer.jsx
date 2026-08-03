import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Logo from "../../assets/images/doc_1.png";

const Footer = ({ isDarkMode }) => {
  return (
    <footer className={`transition-colors duration-300 ${isDarkMode ? "bg-slate-950 text-slate-100" : "bg-slate-50 text-slate-950"}`}>

      <div className="mx-auto max-w-7xl px-6 py-16">

        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">

          {/* Logo */}

          <div>
            <div className="flex items-center gap-4">

              <img src={Logo} alt="Docdor logo" className="h-28 w-32 rounded-xl object-contain" />
            </div>

            <p className={`leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Your trusted healthcare companion for consultations,
              medicines, diagnostics, AI assistance, and wellness.
            </p>

            <div className="mt-6 flex gap-4">
              <a
                href="#"
                className="rounded-full bg-slate-200 p-3 text-slate-700 hover:bg-slate-300"
              >
                <FaFacebook />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-200 p-3 text-slate-700 hover:bg-slate-300"
              >
                <FaInstagram />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-200 p-3 text-slate-700 hover:bg-slate-300"
              >
                <FaTwitter />
              </a>

              <a
                href="#"
                className="rounded-full bg-slate-200 p-3 text-slate-700 hover:bg-slate-300"
              >
                <FaLinkedin />
              </a>

            </div>

          </div>

          {/* Company */}

          <div>
<h3 className="mb-5 text-xl font-semibold text-slate-950">
              Company
            </h3>

            <ul className="space-y-3 text-slate-600">

              <li>
                <a href="#" className="hover:text-slate-900">
                  About Us
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Contact
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Careers
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Blog
                </a>
              </li>

            </ul>
          </div>

          {/* Support */}

          <div>
            <h3 className="mb-5 text-xl font-semibold text-slate-950">
              Support
            </h3>

            <ul className="space-y-3 text-slate-600">

              <li>
                <a href="#" className="hover:text-slate-900">
                  Help Center
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Privacy Policy
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a href="#" className="hover:text-white">
                  Refund Policy
                </a>
              </li>

            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="mb-5 text-xl font-semibold text-slate-950">
              Contact
            </h3>

            <div className={`space-y-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>

              <p>📍 Indore, India</p>

              <p>📞 +91 98765 43210</p>

              <p>✉ support@docdor.com</p>

            </div>

          </div>

        </div>

        <div className={`mt-12 border-t pt-6 text-center ${isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"}`}>
          © {new Date().getFullYear()} Docdor. All Rights Reserved.
        </div>

      </div>
    </footer>
  );
};

export default Footer;