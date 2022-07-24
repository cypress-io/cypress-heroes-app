import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css'],
})
export class ButtonComponent implements OnInit {
  @Input() type: 'primary' | 'secondary' | 'danger' | 'outline' = 'primary';
  @Input() expand: 'inline-block' | 'full' = 'inline-block';
  @Input() text!: string;

  constructor() {}

  getStyles() {
    let styles =
      'items-center py-2 px-4 text-sm font-medium text-center rounded-lg focus:ring-4 focus:outline-none';
    switch (this.type) {
      case 'primary':
        styles +=
          ' text-white bg-blue-700 hover:bg-blue-800 focus:ring-blue-300';
        break;
      case 'secondary':
        styles +=
          ' text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-gray-300';
        break;
      case 'danger':
        styles += ' text-white bg-red-600 hover:bg-red-700 focus:ring-red-300';
        break;
      case 'outline':
        styles +=
          ' text-gray-800 bg-gray-200/10 hover:bg-gray-200/75 focus:ring-gray-300 border border-gray-300';
    }
    if (this.expand === 'full') {
      styles += ' w-full'
    }
    return styles;
    //
  }

  ngOnInit(): void {}
}
