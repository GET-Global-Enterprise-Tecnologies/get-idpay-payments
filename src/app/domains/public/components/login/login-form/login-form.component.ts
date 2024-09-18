import { Component, inject } from "@angular/core";
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { Router } from "@angular/router";

@Component({
  selector: "app-login-form",
  standalone: true,
  imports: [MatInputModule, ReactiveFormsModule, MatButtonModule],
  templateUrl: "./login-form.component.html",
  styleUrl: "./login-form.component.scss",
})
export class LoginFormComponent {
  private router = inject(Router);
  user = {
    email: "software@globalenterprise.com.co",
    password: "softwaredemo",
  };
  form = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required]),
  });
  errorCredentials = false;

  onSubmit() {
    if (!this.form.valid) return;
    this.errorCredentials = false;
    const succes = this.validateCredentials();
  }

  validateCredentials() {
    if (
      !(this.user.email === this.form.value.email) &&
      !(this.user.password === this.form.value.email)
    ) {
      this.resetForm();
      this.errorCredentials = true;
      return;
    }
    this.router.navigateByUrl("/upload-load");
  }

  resetForm() {
    this.form.reset();
  }
}
