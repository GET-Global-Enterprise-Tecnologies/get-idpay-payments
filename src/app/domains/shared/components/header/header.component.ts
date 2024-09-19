import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar>
      <section class="logo">
        <span>Quimera</span>
        <p class="by">by idpay</p>
      </section>

      <div class="spacer"></div>

      <button mat-button routerLink="/analyze-data">Inicio</button>
    </mat-toolbar>
  `,
  styles: `
    .by {
      margin-left: 10px;
      font-size: 12px;
    }
    .spacer {
      flex: 1 1 auto;
    }
    .logo {
      display: flex;
      align-items: center;
    }

    mat-toolbar {
      background-color: #752fd9;
      color: white;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 20px;
      gap: 32px;
    }

    button {
      color: white;
      background-color: transparent;
      border: none;
      with: 120px;
      height: 56px;
      cursor: pointer;
    }

    button:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    button.active {
      background-color: rgba(255, 255, 255, 0.1);
    }

    button.active:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }

    button.mat-button {
      margin-left: 10px;
    }`,
})
export class HeaderComponent {}
