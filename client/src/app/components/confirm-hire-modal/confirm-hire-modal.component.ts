import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Hero } from 'src/app/services/models';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'confirm-hire-modal',
  templateUrl: './confirm-hire-modal.component.html',
  styleUrls: [],
})
export class ConfirmHireModalComponent implements OnInit {

  constructor(private modalService: ModalService) { }

  @Input() hero!: Hero;
  @Input() onHire!: any

  ngOnInit(): void {}


  hideModal() {
    this.modalService.hide();
  }

}
