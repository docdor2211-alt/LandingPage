import { useRouter } from "./routerContext";

const Link = ({ to, children, className = "", onClick, ...props }) => {
  const { navigate, isActive } = useRouter();

  const handleClick = (event) => {
    if (onClick) onClick(event);
    if (event.defaultPrevented) return;

    if (
      event.button !== 0 ||
      event.metaKey ||
      event.altKey ||
      event.ctrlKey ||
      event.shiftKey
    ) {
      return;
    }

    if (
      typeof to === "string" &&
      (to.startsWith("http://") ||
        to.startsWith("https://") ||
        to.startsWith("mailto:") ||
        to.startsWith("tel:"))
    ) {
      return;
    }

    event.preventDefault();
    navigate(to);
  };

  const active = typeof to === "string" && !to.includes("#") ? isActive(to) : false;

  return (
    <a
      href={to}
      onClick={handleClick}
      aria-current={active ? "page" : undefined}
      className={className}
      {...props}
    >
      {children}
    </a>
  );
};

export default Link;

