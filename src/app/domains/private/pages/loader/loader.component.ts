import { Component } from "@angular/core";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
  selector: "app-loader",
  standalone: true,
  imports: [MatProgressSpinnerModule],
  template: `
    <div class="container">
      <mat-progress-spinner mode="indeterminate" diameter="100" />
      <h3>Loading...</h3>
    </div>
  `,
  styles: `
    .container {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }
  `,
})
export class LoaderComponent {}
