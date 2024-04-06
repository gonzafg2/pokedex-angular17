import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../models/pokedex.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokeapiService {
  public POKEAPI_URL_BASE: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) {}

  getPokemon(id: string): Observable<Pokemon> {
    return this.http.get<Pokemon>(`${this.POKEAPI_URL_BASE}/${id}`);
  }
}
