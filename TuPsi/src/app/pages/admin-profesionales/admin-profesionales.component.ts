import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { Profesional } from 'src/app/models/profesional.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-profesionales',
  templateUrl: './admin-profesionales.component.html',
  styleUrls: ['./admin-profesionales.component.css']
})
export class AdminProfesionalesComponent implements OnInit, OnDestroy {
  Profesionales: Profesional[] = []; //array de profionales que traemos del servicio
  profesionalCreadoSubscription: Subscription = Subscription.EMPTY; //suscribimos la vairable al observable
  tieneProfesionales: boolean = false; // hay algun profesional registrado o esta vacia la lista?

  constructor(private servicioProfesionales: ProfesionalService) {} 

  ngOnInit() {
    this.verProfesionales();
    this.profesionalCreadoSubscription = this.servicioProfesionales
      .getProfesionalCreadoObservable()
      .subscribe((profesional) => {
        this.Profesionales.push(profesional);
        this.tieneProfesionales = true;
      });
  }

  ngOnDestroy() {
    this.profesionalCreadoSubscription.unsubscribe();
  }

  verProfesionales() {
    this.servicioProfesionales.getProfesional().subscribe(
      (data) => {
        this.Profesionales = data;
        this.tieneProfesionales = this.Profesionales.length > 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarProfesional(item: Profesional) {
    item.editando = true;
  }

  cancelarEdicion(item: Profesional) {
    item.editando = false;
  }

  guardarCambios(item: Profesional) {
    this.servicioProfesionales.updateProfesional(item).subscribe(
      (profesionalActualizado) => {
        item.editando = false;
        console.log('Profesional actualizado:', profesionalActualizado);
      },
      (error) => {
        console.log('Error al actualizar el profesional:', error);
      }
    );
  }

  eliminarProfesional(id: number) {
    this.servicioProfesionales.deleteProfesional(id).subscribe(
      () => {
        console.log('Profesional eliminado con ID:', id);
        this.verProfesionales();
      },
      (error) => {
        console.log('Error al eliminar el profesional:', error);
      }
    );
  }
}
