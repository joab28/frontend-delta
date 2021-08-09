import { useEffect } from "react";

/**
 * Permite ouvir um evento utilizando hook
 * @param eventName nome do evento
 * @param handler função para receber o evento
 * @param element elemento dom (window é o padrão)
 */
export function useEvent(
  eventName: string,
  handler: EventListenerOrEventListenerObject,
  element = window
) {
  useEffect(() => {
    element.addEventListener(eventName, handler);
    return () => element.removeEventListener(eventName, handler);
  }, [eventName, element, handler]);
}
