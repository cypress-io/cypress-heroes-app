import {
  Component,
  HostListener,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-modal',
  template: `
    <div>
      <div
        class="fixed flex flex-col justify-center items-center top-0 left-0 insert-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="modal"
        (mousedown)="hideModal()"
        #backdrop
      >
        <div
          class="p-8 border shadow-lg rounded-md bg-white relative -top-32"
          (mousedown)="$event.stopPropagation()"
        >
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class ModalComponent {
  constructor(private modalService: ModalService) {}

  @ViewChild('modalContainer', { read: ViewContainerRef })
  modalContainer!: ViewContainerRef;

  @HostListener('window:keydown', ['$event'])
  hideModalOnEscape(event: KeyboardEvent) {
    if (event.code === 'Escape') {
      this.hideModal();
    }
  }

  hideModal() {
    this.modalService.hide();
  }
}
