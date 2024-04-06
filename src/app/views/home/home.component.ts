import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { CardPokeComponent } from '../../components/card-poke/card-poke.component';
import { FailPokeComponent } from '../../components/fail-poke/fail-poke.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { Pokemon } from '../../models/pokedex.model';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    HeaderComponent,
    CardPokeComponent,
    FailPokeComponent,
    LoaderComponent,
    FormsModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Pokédex with Angular 17';
  public subtitle: string = 'Based on PokeAPI';
  public pokemonName: string = 'Mew';
  public pokemon: null | Pokemon = null;
  public POKEAPI_URL_BASE: string = 'https://pokeapi.co/api/v2/pokemon/';
  public loading: boolean = true;
  public visible: boolean = false;

  constructor(private pokeapiService: PokeapiService) {}

  ngOnInit(): void {
    this.searchPokemon();
  }

  private pokeNameSanitize(pokeName: string): string {
    return pokeName.toLowerCase().trim();
  }

  public searchPokemon(): void {
    const pokeName = this.pokeNameSanitize(this.pokemonName);
    this.loading = true;

    this.pokeapiService.getPokemon(pokeName).subscribe({
      next: (data: any) => {
        this.pokemon = {
          abilities: data.abilities,
          height: data.height,
          id: data.id,
          image: data.sprites?.other?.dream_world?.front_default,
          name: data.name,
          type: data.types[0].type.name,
          weight: data.weight,
        };
        this.loading = false;
      },
      error: (e) => {
        console.log(e);
        this.pokemon = null;
        this.loading = false;
      },
    });
  }
}
