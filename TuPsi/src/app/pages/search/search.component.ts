import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProfesionalService } from 'src/app/services/profesional.service';
import { Profesional } from 'src/app/models/profesional.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  profesionales: Profesional[] = [];
  profesionalesFiltrados: Profesional[] = [];
  tipoTerapiaSeleccionada: string = '';
  provinciaSeleccionada: string = '';
  profesionalCreadoSubscription: Subscription = Subscription.EMPTY;
  tieneProfesionales: boolean = false;
  tiposTerapiaDisponibles: string[] = [];
  provinciasDisponibles: string[] = [];
  coloresPasteles: string[] = ['rgb(207, 216, 220)', 'rgb(187, 222, 251)', 'rgb(200, 230, 201)'];

  constructor(private servicioProfesionales: ProfesionalService) {}

  ngOnInit() {
    this.verProfesionales();
    this.profesionalCreadoSubscription = this.servicioProfesionales
      .getProfesionalCreadoObservable()
      .subscribe((profesional) => {
        this.profesionales.push(profesional);
        this.tieneProfesionales = true;
        this.aplicarFiltros();
      });
  }

  ngOnDestroy() {
    this.profesionalCreadoSubscription.unsubscribe();
  }

  verProfesionales() {
    this.servicioProfesionales.getProfesional().subscribe(
      (data) => {
        this.profesionales = data;
        this.tieneProfesionales = this.profesionales.length > 0;
        this.obtenerTiposTerapiaDisponibles();
        this.obtenerProvinciasDisponibles();
        this.aplicarFiltros();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  obtenerTiposTerapiaDisponibles() {
    this.tiposTerapiaDisponibles = Array.from(
      new Set(this.profesionales.map((profesional) => profesional.tipo_de_terapia))
    );
  }

  obtenerProvinciasDisponibles() {
    this.provinciasDisponibles = Array.from(
      new Set(this.profesionales.map((profesional) => profesional.provincia))
    );
  }

  filtrarProfesionales() {
    this.aplicarFiltros();
  }

  resetearFiltros() {
    this.tipoTerapiaSeleccionada = '';
    this.provinciaSeleccionada = '';
    this.aplicarFiltros();
  }

  aplicarFiltros() {
    this.profesionalesFiltrados = this.profesionales.filter((profesional) => {
      if (
        (!this.tipoTerapiaSeleccionada || profesional.tipo_de_terapia === this.tipoTerapiaSeleccionada) &&
        (!this.provinciaSeleccionada || profesional.provincia === this.provinciaSeleccionada)
      ) {
        return true;
      }
      return false;
    });
  }

  getCardStyle(index: number) {
    const colorIndex = index % this.coloresPasteles.length;
    const backgroundColor = this.coloresPasteles[colorIndex];
    return { 'background-color': backgroundColor };
  }
}
