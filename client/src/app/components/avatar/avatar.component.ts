import { Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Hero } from 'src/app/services/models';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.css']
})
export class AvatarComponent implements OnInit {

  @Input() hero!: Hero;
  @Input() class?: string;

  constructor() { }

  ngOnInit(): void {
  }

}
