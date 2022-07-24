import {
  Component,
  EmbeddedViewRef,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private modalService: ModalService,
    private vref: ViewContainerRef
  ) {}

  embeddedViewRef?: EmbeddedViewRef<any>;

  @ViewChild('modalTemplate', { read: TemplateRef })
  modalTemplate!: TemplateRef<any>;

  ngOnInit(): void {
    this.modalService.getModal().subscribe((modalInfo) => {
      if (this.embeddedViewRef) {
        this.embeddedViewRef.destroy();
        this.embeddedViewRef = undefined;
      }
      if (modalInfo) {
        this.embeddedViewRef = this.vref.createEmbeddedView(modalInfo.template, { $implicit: modalInfo.context });
      }
    });
  }
}
