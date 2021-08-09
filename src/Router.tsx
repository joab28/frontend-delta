import { usePath } from "./deps/usePath";
import { NotFoundPage } from "./pages/NotFoundPage/NotFoundPage";
import { routes } from "./routes";

export function Router() {
  const [path] = usePath();
  const Page = routes[path as keyof typeof routes];

  return Page ? <Page /> : <NotFoundPage />;
}
