import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

export interface Vehicle {
  _id: string;
  placa: string;
  renavam: string;
  chassi: string;
  modelo: string;
  marca: string;
  ano: number;
}

interface VehiclesResponse {
  success: boolean;
  data: Vehicle[];
  timestamp: string;
  path: string;
  correlationId: string;
}

@Injectable({ providedIn: 'root' })
export class VehiclesService {
  private http = inject(HttpClient);
  private API_URL = 'http://localhost:3000/api/v1';

  list(): Observable<Vehicle[]> {
    return this.http.get<VehiclesResponse>(`${this.API_URL}/vehicles`).pipe(map((res) => res.data));
  }
}
