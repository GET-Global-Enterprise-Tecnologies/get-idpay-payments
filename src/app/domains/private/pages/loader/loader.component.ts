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
      position: fixed;
      width: 100%;
      background-color: rgba(256, 256, 256, 1);
      z-index: 9999;
      left: 0;
      top: 0;
    }
  `,
})
export class LoaderComponent {}
