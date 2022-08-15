// ***********************************************************
// This example support/component.ts is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands';

// Alternatively you can use CommonJS syntax:
// require('./commands')

import { mount } from './mount';
import {
  AfterViewInit,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ButtonComponent } from 'src/app/components/button/button.component';
import { CardComponent } from 'src/app/components/card/card.component';
import { AvatarComponent } from 'src/app/components/avatar/avatar.component';
import { TestBed } from '@angular/core/testing';

// Augment the Cypress namespace to include type definitions for
// your custom command.
// Alternatively, can be defined in cypress/support/component.d.ts
// with a <reference path="./component" /> at the top of your spec.
declare global {
  namespace Cypress {
    interface Chainable {
      mount: typeof customMount;
    }
  }
}

type ComponentParam = Parameters<typeof mount>[0];
type ConfigParam = Parameters<typeof mount>[1];
type MountReturn = ReturnType<typeof mount>;

Cypress.Commands.add('mount', customMount);

const declarations = [AvatarComponent, CardComponent, ButtonComponent];

function customMount<T extends object>(
  componentOrTemplate: ComponentParam,
  config?: ConfigParam
): MountReturn {
  if (!config) {
    config = { declarations };
  } else {
    config.declarations = [...(config?.declarations || []), ...declarations];
  }
  return mount<T>(componentOrTemplate as any, config)
}

