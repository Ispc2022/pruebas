import { Component, OnInit, OnDestroy } from '@angular/core';
import { PlanesService } from 'src/app/services/planes.service';
import { Plan } from 'src/app/models/planes.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-planes',
  templateUrl: './admin-planes.component.html',
  styleUrls: ['./admin-planes.component.css'],
})
export class AdminPlanesComponent implements OnInit, OnDestroy {
  Planes: Plan[] = [];
  planCreadoSubscription: Subscription = Subscription.EMPTY;
  tienePlanes: boolean = false;

  constructor(private servicioPlanes: PlanesService) {}

  ngOnInit() {
    this.verPlanes();
    this.planCreadoSubscription = this.servicioPlanes
      .getPlanCreadoObservable()
      .subscribe((paciente) => {
        this.Planes.push(paciente);
        this.tienePlanes = true;
      });
  }

  ngOnDestroy() {
    this.planCreadoSubscription.unsubscribe();
  }

  verPlanes() {
    this.servicioPlanes.getPlan().subscribe(
      (data) => {
        this.Planes = data;
        this.tienePlanes = this.Planes.length > 0;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  editarPlan(item: Plan) {
    item.editando = true;
  }

  cancelarEdicion(item: Plan) {
    item.editando = false;
  }

  guardarCambios(item: Plan) {
    this.servicioPlanes.updatePlan(item).subscribe(
      (planActualizado) => {
        item.editando = false;
        console.log('Plan actualizado:', planActualizado);
      },
      (error) => {
        console.log('Error al actualizar el plan:', error);
      }
    );
  }

  eliminarPlan(id: number | undefined) {
    if (id !== undefined) {
      this.servicioPlanes.deletePlan(id).subscribe(
        () => {
          console.log('Plan eliminado con ID:', id);
          this.verPlanes();
        },
        (error) => {
          console.log('Error al eliminar el plan:', error);
        }
      );
    }
  }
}
