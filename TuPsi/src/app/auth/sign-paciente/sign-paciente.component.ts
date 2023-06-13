import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente.model';

@Component({
  selector: 'app-sign-paciente',
  templateUrl: './sign-paciente.component.html',
  styleUrls: ['./sign-paciente.component.css'],
})
export class SignPacienteComponent implements OnInit {
  form: FormGroup;
  user: Paciente;

  constructor(
    private formBuilder: FormBuilder,
    private signService: PacienteService,
    private router: Router
  ) {
    this.user = {} as Paciente; // Asignar objeto vacío como valor inicial
    this.form = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      apellido: ['', [Validators.required]],
      dni: ['', [Validators.required]],
      sexo: ['', [Validators.required]],
      terapia: ['', [Validators.required]],
      provincia: ['', [Validators.required]],
      localidad: ['', [Validators.required]],
      telefono: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {}

  onEnviar(event: Event, usuario: Paciente): void {
    event.preventDefault();

    if (this.form.valid) {
      console.log('Enviando al servidor...');
      console.log(usuario);
      this.signService.createPaciente(usuario).subscribe((data:any) => {
        console.log(data.id);
        if (data.id > 0) {
          alert(
            'El registro ha sido creado satisfactoriamente. A continuación, por favor Inicie Sesión.'
          );
          this.router.navigate(['/iniciar-sesion']);
        }
      });
    } else {
      this.form.markAllAsTouched();
    }
  }

  get password() {
    return this.form.get('password');
  }
  get email() {
    return this.form.get('email');
  }

  get nombre() {
    return this.form.get('nombre');
  }

  get apellido() {
    return this.form.get('apellido');
  }
  get telefono() {
    return this.form.get('telefono');
  }
  
  get dni() {
    return this.form.get('dni');
  }
  get provincia() {
    return this.form.get('provincia');
  }
  get localidad() {
    return this.form.get('localidad');
  }
  get terapia() {
    return this.form.get('terapia');
  }
  get sexo() {
    return this.form.get('sexo');
  }
  get emailValid() {
    return this.email?.touched && !this.email?.valid;
  }

  get nombreValid() {
    return this.nombre?.touched && !this.nombre?.valid;
  }

  get apellidoValid() {
    return this.apellido?.touched && !this.apellido?.valid;
  }
  get passwordValid() {
    return this.password?.touched && !this.password?.valid;
  }
  
  get dniValid() {
    return this.dni?.touched && !this.dni?.valid;
  }
  get telefonoValid() {
    return this.telefono?.touched && !this.telefono?.valid;
  }
  get terapiaValid() {
    return this.terapia?.touched && !this.terapia?.valid;
  }
  get provinciaValid() {
    return this.provincia?.touched && !this.provincia?.valid;
  }
  get localidadValid() {
    return this.localidad?.touched && !this.localidad?.valid;
  }
  get sexoValid() {
    return this.sexo?.touched && !this.sexo?.valid;
  }
}
