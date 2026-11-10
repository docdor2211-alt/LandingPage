import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";
import Logo from "../../assets/images/doc_1.png";
import Link from "../../router/Link";
import { useRouter } from "../../router/routerContext";
import { COMPANY_LINKS, ROUTES, SUPPORT_LINKS } from "../../router/routes";

const Footer = ({ isDarkMode }) => {
  const { isActive } = useRouter();

  const headingClasses = `mb-5 text-xl font-semibold ${
    isDarkMode ? "text-slate-100" : "text-slate-950"
  }`;

  const linkClasses = (to) => {
    const active = isActive(to);
    if (active) {
      return "text-sky-500 font-semibold transition-colors";
    }
    return `transition-colors ${
      isDarkMode
        ? "text-slate-400 hover:text-sky-400"
        : "text-slate-600 hover:text-sky-600"
    }`;
  };

  const socialClasses = `rounded-full p-3 transition ${
    isDarkMode
      ? "bg-slate-800 text-slate-300 hover:bg-sky-500 hover:text-white"
      : "bg-slate-200 text-slate-700 hover:bg-sky-500 hover:text-white"
  }`;

  return (
    <footer
      className={`border-t transition-colors duration-300 ${
        isDarkMode
          ? "border-slate-800/80 bg-slate-950 text-slate-100"
          : "border-slate-200/80 bg-slate-50 text-slate-950"
      }`}
    >
      <div className="mx-auto max-w-7xl px-6 pt-16 pb-28 md:pb-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo & About */}
          <div>
            <Link to={ROUTES.HOME} aria-label="Docdor Home" className="inline-flex items-center gap-4">
              <img src={Logo} alt="Docdor logo" className="h-24 w-32 rounded-xl object-contain" />
            </Link>

            <p className={`mt-2 leading-7 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              Your trusted healthcare companion for consultations,
              medicines, diagnostics, AI assistance, and wellness.
            </p>

            <div className="mt-6 flex gap-3.5">
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Facebook"
                className={socialClasses}
              >
                <FaFacebook />
              </a>

              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Instagram"
                className={socialClasses}
              >
                <FaInstagram />
              </a>

              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on Twitter"
                className={socialClasses}
              >
                <FaTwitter />
              </a>

              <a
                href="https://www.linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Docdor on LinkedIn"
                className={socialClasses}
              >
                <FaLinkedin />
              </a>
            </div>
          </div>

          {/* Company */}
          <div>
            <h3 className={headingClasses}>Company</h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className={headingClasses}>Support</h3>
            <ul className="space-y-3">
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
          <div>
            <h3 className={headingClasses}>Contact</h3>

            <div className={`space-y-4 ${isDarkMode ? "text-slate-400" : "text-slate-600"}`}>
              <p>
                <Link to={ROUTES.CONTACT} className="hover:text-sky-500 transition-colors">
                  📍 Indore, India
                </Link>
              </p>

              <p>
                <a href="tel:+919876543210" className="hover:text-sky-500 transition-colors">
                  📞 +91 98765 43210
                </a>
              </p>

              <p>
                <a href="mailto:support@docdor.com" className="hover:text-sky-500 transition-colors">
                  ✉ support@docdor.com
                </a>
              </p>
            </div>
          </div>
        </div>

        <div
          className={`mt-12 border-t pt-6 text-center text-sm ${
            isDarkMode ? "border-slate-800 text-slate-500" : "border-slate-200 text-slate-500"
          }`}
        >
          © {new Date().getFullYear()} Docdor. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
