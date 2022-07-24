import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  Hero,
  HeroEditModel,
  Power,
} from '../../services/models';

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css'],
})
export class HeroFormComponent implements OnInit {
  constructor() {}

  @Input('hero') hero?: Hero;
  @Input('powers') powers: Power[] = [];
  @Output() onSave = new EventEmitter<{
    hero: HeroEditModel;
    file?: File;
  }>();

  imageUrl: string = '';
  file?: File;

  heroForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    price: new FormControl(0, [Validators.required, Validators.min(1)]),
    fans: new FormControl(0, [Validators.required]),
    saves: new FormControl(0, [Validators.required]),
    powers: new FormControl<number[]>([], [Validators.required]),
  });

  async onSubmit() {
    if (this.heroForm.valid) {
      const hero = {
        id: this.hero?.id,
        ...this.heroForm.value
      }
      this.onSave.emit({
        hero: hero as HeroEditModel,
        file: this.file,
      });
    }
  }

  onFileChange(file: File) {
    if (file) {
      this.file = file;
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageUrl = reader.result as string;
      };
    }
  }

  ngOnInit(): void {
    if (this.hero) {
      const { id, avatarUrl, ...rest } = this.hero;
      this.heroForm.setValue({
        ...rest,
        powers: this.hero.powers.map((x) => x.id),
      });
    }
  }
}
