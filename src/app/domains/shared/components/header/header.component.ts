import { Component } from "@angular/core";
import { MatToolbarModule } from "@angular/material/toolbar";

@Component({
  selector: "app-header",
  standalone: true,
  imports: [MatToolbarModule],
  template: `
    <mat-toolbar>
      <span>Quimera</span>
      <p class="by">by idpay</p>
    </mat-toolbar>
  `,
  styleUrl: "./header.component.scss",
})
export class HeaderComponent {}
