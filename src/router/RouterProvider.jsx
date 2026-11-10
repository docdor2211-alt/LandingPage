import { useCallback, useEffect, useMemo, useState } from "react";
import { RouterContext } from "./routerContext";
import { normalizePathname, ROUTE_META, ROUTES } from "./routes";

const readLocation = () => {
  if (typeof window === "undefined") {
    return { pathname: ROUTES.HOME, search: "", hash: "" };
  }
  return {
    pathname: normalizePathname(window.location.pathname),
    search: window.location.search || "",
    hash: window.location.hash || "",
  };
};

const scrollToHashOrTop = (hash, behavior = "smooth") => {
  if (typeof window === "undefined") return;

  if (hash) {
    const id = hash.replace(/^#/, "");
    window.setTimeout(() => {
      const target = document.getElementById(id);
      if (target) {
        target.scrollIntoView({ behavior, block: "start" });
      }
    }, 90);
  } else {
    window.scrollTo({ top: 0, behavior });
  }
};

const RouterProvider = ({ children }) => {
  const [location, setLocation] = useState(readLocation);

  useEffect(() => {
    const handlePopState = () => {
      const next = readLocation();
      setLocation(next);
      scrollToHashOrTop(next.hash, "auto");
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  useEffect(() => {
    const meta = ROUTE_META[location.pathname];
    document.title = meta ? meta.title : "Page Not Found | Docdor";
  }, [location.pathname]);

  const navigate = useCallback((to, options = {}) => {
    if (typeof window === "undefined") return;

    const url = new URL(to, window.location.origin);
    const nextPathname = normalizePathname(url.pathname);
    const nextSearch = url.search || "";
    const nextHash = url.hash || "";
    const targetUrl = `${nextPathname}${nextSearch}${nextHash}`;

    const isSameRoute =
      nextPathname === location.pathname &&
      nextSearch === location.search &&
      nextHash === location.hash;

    if (!isSameRoute) {
      if (options.replace) {
        window.history.replaceState({}, "", targetUrl);
      } else {
        window.history.pushState({}, "", targetUrl);
      }
      setLocation({
        pathname: nextPathname,
        search: nextSearch,
        hash: nextHash,
      });
    }

    scrollToHashOrTop(nextHash, options.instant ? "auto" : "smooth");
  }, [location.hash, location.pathname, location.search]);

  const isActive = useCallback(
    (path) => normalizePathname(path) === location.pathname,
    [location.pathname]
  );

  const value = useMemo(
    () => ({
      pathname: location.pathname,
      search: location.search,
      hash: location.hash,
      navigate,
      isActive,
    }),
    [location.pathname, location.search, location.hash, navigate, isActive]
  );

  return (
    <RouterContext.Provider value={value}>
      {children}
    </RouterContext.Provider>
  );
};

export default RouterProvider;

