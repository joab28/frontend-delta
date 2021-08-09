import { useState } from "react";
import { useEvent } from "./useEvent";

/**
 * Hook para capturar o path atual de navegação
 */
export function usePath() {
  const [path, setPath] = useState(window.location.pathname);

  function handler() {
    setPath(window.location.pathname);
    window.document.title = window.location.pathname;
  }

  function navigateTo(pathname: string) {
    window.history.pushState({}, "", pathname);
    setPath(pathname);
  }

  useEvent("popstate", handler);

  return [path, navigateTo] as const;
}
