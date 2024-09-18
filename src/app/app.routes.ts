import { Routes } from "@angular/router";

export const routes: Routes = [
  {
    path: "",
    loadComponent() {
      return import("./domains/public/pages/login/login.component").then(
        (m) => m.LoginComponent
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
