import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HeroEditModel, Power } from '../../services/models';
import { HeroService } from '../../services/hero.service';
import { PowerService } from '../../services/power.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-hero-new',
  templateUrl: './hero-new.component.html',
  styleUrls: ['./hero-new.component.css'],
})
export class HeroNewComponent implements OnInit {
  constructor(
    private heroService: HeroService,
    private powerService: PowerService,
    private location: Location
  ) {}

  $powers!: Observable<Power[]>;

  async createHero({ hero, file }: { hero: HeroEditModel; file?: File }) {
    this.heroService.addHero(hero, file).subscribe(() => {
      this.location.back();
    });
  }

  ngOnInit(): void {
    this.$powers = this.powerService.getPowers();
  }
}
