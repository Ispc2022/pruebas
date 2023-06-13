import { Component, OnInit, OnDestroy } from '@angular/core';
import { PacienteService } from 'src/app/services/paciente.service';
import { Paciente } from 'src/app/models/paciente.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-pacientes',
  templateUrl: './admin-pacientes.component.html',
  styleUrls: ['./admin-pacientes.component.css']
})
export class AdminPacientesComponent implements OnInit, OnDestroy {

  Pacientes: Paciente[] = [];
  tienePacientes: boolean = false;

  constructor(private servicioPacientes: PacienteService) {}

  ngOnInit() {
    this.verPacientes();
  }

  ngOnDestroy() {
  }

  verPacientes() {
    this.servicioPacientes.getAllPacientes().subscribe(
      (data) => {
        this.Pacientes = data;
        this.tienePacientes = this.Pacientes.length > 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  

  editarPaciente(item: Paciente) {
    item.editando = true;
  }

  cancelarEdicion(item: Paciente) {
    item.editando = false;
  }

  guardarCambios(item: Paciente) {
    this.servicioPacientes.updatePaciente(item).subscribe(
      (pacienteActualizado) => {
        item.editando = false;
        console.log('Paciente actualizado:', pacienteActualizado);
      },
      (error) => {
        console.log('Error al actualizar el paciente:', error);
      }
    );
  }

  eliminarPaciente(id: number) {
    this.servicioPacientes.deletePaciente(id).subscribe(
      () => {
        console.log('Paciente eliminado con ID:', id);
        this.verPacientes();
      },
      (error) => {
        console.log('Error al eliminar el paciente:', error);
      }
    );
  }
}
