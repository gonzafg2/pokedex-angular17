import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../components/header/header.component';
import { PokeapiService } from '../../services/pokeapi.service';
import { Pokemon } from '../../models/pokedex.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HeaderComponent, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  public title: string = 'Pokédex with Angular 17';
  public subtitle: string = 'Based on PokeAPI';
  public pokemonName: string = 'Mew';
  public pokemon: null | Pokemon = null;
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
      },
      error: (e) => {
        console.log(e);
        this.pokemon = null;
      },
    });
  }
}
