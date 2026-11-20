import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AlgorithmType,
  SearchResult,
  TrolleyExperimentResult,
  WarehouseScenario,
} from '../models/warehouse.model';

@Injectable({
  providedIn: 'root',
})
export class WarehouseApiService {
  private readonly http = inject(HttpClient);

  getScenario(): Observable<WarehouseScenario> {
    return this.http.get<WarehouseScenario>('/api/scenario');
  }

  generateRandomScenario(seed: number): Observable<WarehouseScenario> {
    return this.http.get<WarehouseScenario>(`/api/scenario/random?seed=${seed}`);
  }

  getResults(): Observable<{ results: SearchResult[] }> {
    return this.http.get<{ results: SearchResult[] }>('/api/results');
  }

  runAlgorithm(algorithm: AlgorithmType): Observable<SearchResult> {
    return this.http.get<SearchResult>(`/api/run/${algorithm}`);
  }

  runTrolley(): Observable<TrolleyExperimentResult> {
    return this.http.get<TrolleyExperimentResult>('/api/trolley');
  }
}
