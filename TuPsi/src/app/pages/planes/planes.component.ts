import { Component, OnInit } from '@angular/core';
import { Plan } from 'src/app/models/planes.model';
import { PlanesService } from 'src/app/services/planes.service';

@Component({
  selector: 'app-planes',
  templateUrl: './planes.component.html',
  styleUrls: ['./planes.component.css']
})
export class PlanesComponent implements OnInit {
  planes: Plan[] = [];

  constructor(private planesService: PlanesService) { }

  ngOnInit(): void {
    this.obtenerPlanes();
  }

  obtenerPlanes(): void {
    this.planesService.getPlan().subscribe(
      (planes: Plan[]) => {
        this.planes = planes;
      },
      (error) => {
        console.log('Error al obtener los planes:', error);
      }
    );
  }
}
