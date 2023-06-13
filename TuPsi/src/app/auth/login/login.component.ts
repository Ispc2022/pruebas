import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/services/login.service';
import { Paciente } from 'src/app/models/paciente.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  user: Paciente;
  returnUrl: string;
  form: FormGroup;
  errorMessage: string | null = null;

  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private router: Router,
    private route: ActivatedRoute) {
    this.user = {} as Paciente;
    this.returnUrl = '/';
    this.form = this.formBuilder.group(
      {
        password: ['', [Validators.required, Validators.minLength(8)]],
        mail: ['', [Validators.required, Validators.email]]
      }
    )
  }

  get Password() {
    return this.form.get("password");
  }

  get Mail() {
    return this.form.get("mail");
  }

  get PasswordValid() {
    return this.Password?.touched && !this.Password?.valid;
  }

  get MailValid() {
    return this.Mail?.touched && !this.Mail?.valid;
  }

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLogin(event: Event): void {
    event.preventDefault();
    const email = this.form.get('mail')?.value;
    const password = this.form.controls['password'].value;
    this.loginService.login(email,password).subscribe(
      data => {
        // Redirige al usuario a la página principal después del inicio de sesión exitoso
        this.router.navigate(['/']);
      },
      error => {
        // Muestra un mensaje de error en caso de que el inicio de sesión falle
        this.errorMessage = 'Correo electrónico no válido';
      }
    );
  }
}


