import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "loader",
    loadComponent() {
      return import("./domains/private/pages/loader/loader.component").then(
        (m) => m.LoaderComponent
      );
    },
  },
];
