import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { FiMail, FiMapPin, FiPhone, FiShield } from "react-icons/fi";
import BrandLogo from "../common/BrandLogo";
import Link from "../../router/Link";
import { useRouter } from "../../router/routerContext";
import { COMPANY_LINKS, ROUTES, SUPPORT_LINKS } from "../../router/routes";

const CARE_LINKS = [
  { label: "Doctor Consultations", to: `${ROUTES.HOME}#services` },
  { label: "Lab Tests at Home", to: `${ROUTES.HOME}#services` },
  { label: "60-Min E-Pharmacy", to: `${ROUTES.HOME}#services` },
  { label: "AI Health Assistant", to: `${ROUTES.HOME}#ai-assistant` },
  { label: "Offers & Care Plan", to: `${ROUTES.HOME}#health-packages` },
];

const Footer = ({ isDarkMode }) => {
  const { isActive } = useRouter();

  const headingClasses = `mb-4 text-xs font-bold uppercase tracking-[0.14em] ${
    isDarkMode ? "text-slate-300" : "text-slate-900"
  }`;

  const linkClasses = (to) => {
    const active = isActive(to);
    if (active) {
      return "text-sm font-semibold text-sky-500 transition-colors";
    }
    return `text-sm transition-colors ${
      isDarkMode
        ? "text-slate-400 hover:text-sky-300"
        : "text-slate-600 hover:text-sky-600"
    }`;
  };

  const socialClasses = `flex h-9 w-9 items-center justify-center rounded-xl border transition ${
    isDarkMode
      ? "border-slate-800 bg-slate-900 text-slate-300 hover:border-sky-500/50 hover:bg-sky-500/15 hover:text-sky-300"
      : "border-slate-200 bg-white text-slate-600 hover:border-sky-300 hover:bg-sky-50 hover:text-sky-600"
  }`;

  return (
    <footer
      className={`border-t transition-colors duration-300 print:hidden ${
        isDarkMode
          ? "border-slate-800/80 bg-[#050914] text-slate-100"
          : "border-slate-200/90 bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 pt-14 pb-28 md:pb-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Brand & Assurance */}
          <div className="lg:col-span-4">
            <Link to={ROUTES.HOME} aria-label="Docdor Home" className="inline-flex">
              <BrandLogo isDarkMode={isDarkMode} size="lg" showTagline />
            </Link>

            <p
              className={`mt-4 max-w-sm text-sm leading-7 ${
                isDarkMode ? "text-slate-400" : "text-slate-600"
              }`}
            >
              Your complete connected healthcare ecosystem—verified doctor consultations,
              NABL home diagnostics, express pharmacy delivery, and physician-reviewed AI guidance.
            </p>

            <div
              className={`mt-5 inline-flex items-center gap-2 rounded-xl border px-3 py-2 text-xs font-semibold ${
                isDarkMode
                  ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-300"
                  : "border-emerald-200 bg-emerald-50 text-emerald-800"
              }`}
            >
              <FiShield className="shrink-0 text-emerald-500" size={14} />
              <span>NMC Verified Doctors &amp; AES-256 Encrypted</span>
            </div>

            <div className="mt-6 flex gap-2.5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Facebook"
                className={socialClasses}
              >
                <FaFacebookF size={14} />
              </a>
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Instagram"
                className={socialClasses}
              >
                <FaInstagram size={15} />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Twitter"
                className={socialClasses}
              >
                <FaTwitter size={14} />
              </a>
              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on LinkedIn"
                className={socialClasses}
              >
                <FaLinkedinIn size={14} />
              </a>
            </div>
          </div>

          {/* Care & Services */}
          <div className="lg:col-span-2">
            <h3 className={headingClasses}>Care</h3>
            <ul className="space-y-2.5">
              {CARE_LINKS.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className={`text-sm transition-colors ${
                      isDarkMode
                        ? "text-slate-400 hover:text-sky-300"
                        : "text-slate-600 hover:text-sky-600"
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="lg:col-span-2">
            <h3 className={headingClasses}>Company</h3>
            <ul className="space-y-2.5">
              {COMPANY_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClasses(item.to)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="lg:col-span-2">
            <h3 className={headingClasses}>Support</h3>
            <ul className="space-y-2.5">
              {SUPPORT_LINKS.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className={linkClasses(item.to)}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-2">
            <h3 className={headingClasses}>Reach Us</h3>
            <div className={`space-y-3 text-sm ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <Link
                to={ROUTES.CONTACT}
                className="flex items-start gap-2.5 hover:text-sky-500 transition-colors"
              >
                <FiMapPin className="mt-1 shrink-0 text-sky-500" size={15} />
                <span>Vijay Nagar, Indore, MP 452010</span>
              </Link>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-2.5 hover:text-sky-500 transition-colors"
              >
                <FiPhone className="shrink-0 text-sky-500" size={15} />
                <span>+91 98765 43210</span>
              </a>

              <a
                href="mailto:support@docdor.com"
                className="flex items-center gap-2.5 hover:text-sky-500 transition-colors break-all"
              >
                <FiMail className="shrink-0 text-sky-500" size={15} />
                <span>support@docdor.com</span>
              </a>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 flex flex-col gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center sm:justify-between ${
            isDarkMode
              ? "border-slate-800/80 text-slate-500"
              : "border-slate-200 text-slate-500"
          }`}
        >
          <p>
            &copy; {new Date().getFullYear()} Docdor Health Technologies Pvt. Ltd. All rights reserved.
          </p>
          <p>
            For emergencies call <strong>108 / 112</strong>. AI tools provide informational guidance only.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
