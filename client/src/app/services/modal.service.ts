import { Injectable, TemplateRef } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  $modalRef = new Subject<
    { template: TemplateRef<any>; context: any } | undefined
  >();
  modals: Record<string, TemplateRef<any>> = {};

  addModal(name: string, modal: TemplateRef<any>) {
    this.modals[name] = modal;
  }

  getModal() {
    return this.$modalRef;
  }

  show(name: string, context?: any) {
    const modal = this.modals[name];
    this.$modalRef.next({ template: modal, context });
  }

  hide() {
    this.$modalRef.next(undefined);
  }
}
