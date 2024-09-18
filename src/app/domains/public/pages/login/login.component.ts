import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { ErrorStateMatcher } from "@angular/material/core";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { Router } from "@angular/router";

@Component({
  selector: "app-login",
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: "./login.component.html",
  styleUrl: "./login.component.scss",
})
export class LoginComponent {
  user = {
    email: "software@globalenterprise.com.co",
    password: "softwaredemo",
  };
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  private router = inject(Router);

  onSubmit() {
    if (!this.form.valid) return;
    const succes = this.validateCredentials();
  }

  validateCredentials() {
    if (
      !(this.user.email === this.form.value.email) &&
      !(this.user.password === this.form.value.email)
    ) {
      this.resetForm();
      return;
    }
    this.router.navigateByUrl("/upload-load");
  }

  resetForm() {
    this.form.reset();
  }
}
