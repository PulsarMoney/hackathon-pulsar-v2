import { PulsarPage } from "./pages/PulsarPage/PulsarPage";

export const routeNames = {
  pulsarPage: "/pulsar-page/:id"
};

const routes: Array<any> = [
  {
    path: routeNames.pulsarPage,
    title: "Pulsar Page",
    component: PulsarPage,
  },
];

const mappedRoutes = routes.map((route) => {
  const title = route.title ? `${route.title} • PulsarPages` : `PulsarPages`;

  const requiresAuth = Boolean(route.authenticatedRoute);
  const wrappedComponent = withPageTitle(title, route.component);

  return {
    path: route.path,
    component: wrappedComponent,
    authenticatedRoute: requiresAuth,
    routeName: route.title,
    requiresFeature: Boolean(route.feature),
    feature: route.feature ?? "",
    protected: route.protected ?? false,
  };
});

export default mappedRoutes;
