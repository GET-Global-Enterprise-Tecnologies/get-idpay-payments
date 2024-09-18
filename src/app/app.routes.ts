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
  {
    path: "analyze-data",
    loadComponent() {
      return import(
        "./domains/private/pages/analyze-data/analyze-data.component"
      ).then((m) => m.AnalyzeDataComponent);
    },
  },
];
