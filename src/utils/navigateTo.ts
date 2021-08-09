export const navigateTo = (pathname: string) => {
  window.history.pushState({}, "", pathname);
  window.dispatchEvent(new Event("popstate"));
};
