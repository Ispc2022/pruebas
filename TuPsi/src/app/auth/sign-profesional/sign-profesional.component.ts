import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { Profesional } from 'src/app/models/profesional.model';

@Component({
  selector: 'app-sign-profesional',
  templateUrl: './sign-profesional.component.html',
  styleUrls: ['./sign-profesional.component.css']
})
export class SignProfesionalComponent implements OnInit {
  formProfesional!: FormGroup;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private profesionalService: ProfesionalService) {}

  ngOnInit(): void {
    this.formProfesional = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      sexo: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      tipo_de_terapia: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required),
      provincia: new FormControl('', Validators.required),
      localidad: new FormControl('', Validators.required),
      numero_matricula: new FormControl('', Validators.required),
    });
  }

  createProfesional() {
    if (this.formProfesional.valid) {
      const formValue = this.formProfesional.value;
      const { nombre, apellido, sexo, telefono, tipo_de_terapia, email, clave, provincia, localidad, numero_matricula } = formValue;

      const profesional: Profesional = {
        nombre: nombre.toString(),
        apellido: apellido.toString(),
        sexo: sexo.toString(),
        telefono: telefono.toString(),
        tipo_de_terapia: tipo_de_terapia.toString(),
        email: email.toString(),
        clave: clave.toString(),
        provincia: provincia.toString(),
        localidad: localidad.toString(),
        numero_matricula: numero_matricula.toString(),
      };

      this.profesionalService.createProfesional(profesional).subscribe(
        (response) => {
          console.log('Profesional registrado con éxito:', response);
          this.formProfesional.reset();
          this.successMessage = 'Profesional creado con éxito.';
          this.errorMessage = '';
        },
        (error) => {
          console.error('Error al intentar registrar el profesional:', error);
          this.successMessage = '';
          this.errorMessage = 'Error al crear el profesional. Por favor, inténtelo nuevamente.';
        }
      );
    } else {
      this.successMessage = '';
      this.errorMessage = 'Por favor, complete todos los campos obligatorios.';
    }
  }

  updateProfesional() {
    // Implementa la lógica para actualizar un profesional
  }

  deleteProfesional() {
    // Implementa la lógica para eliminar un profesional
  }

  generateID(): number {
    return Math.floor(Math.random() * 900) + 100;
  }
}