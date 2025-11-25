import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { VehiclesService, Vehicle } from '../../services/vehicles';

@Component({
  selector: 'app-vehicles-list',
  standalone: true,
  imports: [NgIf, MatTableModule],
  templateUrl: './vehicles-list.html',
  styleUrls: ['./vehicles-list.scss'],
})
export class VehiclesList implements OnInit {
  private service = inject(VehiclesService);

  displayedColumns = ['placa', 'modelo', 'marca', 'ano'];

  dataSourceSignal = signal<Vehicle[]>([]);

  get dataSource() {
    return this.dataSourceSignal();
  }

  ngOnInit() {
    this.service.list().subscribe({
      next: (data) => this.dataSourceSignal.set(data),
      error: (err) => console.error(err),
    });
  }
}
