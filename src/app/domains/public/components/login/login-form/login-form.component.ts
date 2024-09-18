import { Component, inject } from "@angular/core";
import {
  FormBuilder,
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
  user = {
    email: "software@globalenterprise.com.co",
    password: "softwaredemo",
  };
  form!: FormGroup;
  errorCredentials = false;

  private formBuilder = inject(FormBuilder);
  private router = inject(Router);

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]],
    });
  }

  onSubmit() {
    if (!this.form.valid) return;
    this.errorCredentials = false;
    this.validateCredentials();
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
    this.router.navigateByUrl("/analyze-data");
  }

  resetForm() {
    this.form.reset();
  }
}
