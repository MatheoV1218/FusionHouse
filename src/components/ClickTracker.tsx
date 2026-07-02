import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { track } from "@vercel/analytics";

function cleanText(value: string) {
  return value
    .replace(/\s+/g, " ")
    .replace(/[^a-zA-Z0-9À-ÿ&+\- ]/g, "")
    .trim()
    .slice(0, 70);
}

function pageName(pathname: string) {
  const basePath = pathname.replace(/^\/es/, "") || "/";

  if (basePath === "/") return pathname.startsWith("/es") ? "Home Spanish" : "Home";

  const name = basePath
    .replace("/", "")
    .split("-")
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");

  return pathname.startsWith("/es") ? `${name} Spanish` : name;
}

function getClickLabel(element: HTMLElement) {
  const explicit = element.getAttribute("data-track-label");
  const aria = element.getAttribute("aria-label");
  const title = element.getAttribute("title");
  const text = element.innerText || element.textContent || "";
  const value =
    element instanceof HTMLInputElement || element instanceof HTMLButtonElement
      ? element.value
      : "";

  return cleanText(explicit || aria || title || text || value || "Website Click");
}

export default function ClickTracker() {
  const location = useLocation();

  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;

      const clickable = target.closest<HTMLElement>(
        "a, button, summary, [role='button'], input[type='submit']",
      );

      if (!clickable) return;

      const label = getClickLabel(clickable);
      const page = pageName(location.pathname);
      const href =
        clickable instanceof HTMLAnchorElement
          ? clickable.href
          : clickable.getAttribute("href") || "";

      track(`${label} ${page}`, {
        label,
        page,
        path: location.pathname,
        href,
        type: clickable.tagName.toLowerCase(),
      });
    };

    const handleSubmit = (event: SubmitEvent) => {
      const form = event.target as HTMLFormElement | null;
      if (!form) return;

      const page = pageName(location.pathname);
      const label = cleanText(form.getAttribute("data-track-label") || "Contact Form Submitted");

      track(`${label} ${page}`, {
        label,
        page,
        path: location.pathname,
        type: "form",
      });
    };

    document.addEventListener("click", handleClick);
    document.addEventListener("submit", handleSubmit);

    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("submit", handleSubmit);
    };
  }, [location.pathname]);

  return null;
}
