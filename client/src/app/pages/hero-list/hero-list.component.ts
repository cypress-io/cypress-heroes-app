import { Component, OnInit } from '@angular/core';
import { Hero } from '../../services/models';
import { HeroService } from '../../services/hero.service';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.css'],
})
export class HeroListComponent implements OnInit {
  heroes: Hero[] = [];

  constructor(
    private heroService: HeroService,
    private modalService: ModalService
  ) {}

  ngOnInit(): void {
    this.getHeroes();
  }

  getHeroes(): void {
    this.heroService.getHeroes().subscribe((heroes) => (this.heroes = heroes));
  }

  deleteHero(hero: Hero) {
    this.modalService.show('confirmDeleteHero', {
      hero,
      onDelete: () => {
        this.heroService.deleteHero(hero.id).subscribe(() => {
          this.modalService.hide();
          this.heroService.getHeroes();
        });
      },
    });
  }
}
