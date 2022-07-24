import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'login-modal',
  templateUrl: 'login-modal.component.html',
  styleUrls: [],
})
export class LoginModalComponent implements OnInit, AfterViewInit {
  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;

  constructor(private modalService: ModalService, private el: ElementRef) {}

  ngOnInit(): void {}

  hideModal() {
    this.modalService.hide();
  }

  ngAfterViewInit() {
    this.modalService.addModal('login', this.modalTemplate);
  }
}
