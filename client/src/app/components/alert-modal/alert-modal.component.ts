import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'alert-modal',
  templateUrl: './alert-modal.component.html',
  styleUrls: [],
})
export class AlertModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  @Input() message!: string;
  ngOnInit(): void {}


  hideModal() {
    this.modalService.hide();
  }

}
