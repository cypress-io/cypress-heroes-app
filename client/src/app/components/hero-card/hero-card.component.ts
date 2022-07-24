import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Hero } from '../../services/models';

@Component({
  selector: 'app-hero-card',
  templateUrl: './hero-card.component.html',
  styleUrls: ['./hero-card.component.css'],
})
export class HeroCardComponent implements OnInit {
  @Input() hero!: Hero;
  @Output() onDeleteHero = new EventEmitter<Hero>();

  constructor() {}

  ngOnInit(): void { }

  deleteHero() {
    this.onDeleteHero.emit(this.hero)
  }
}
