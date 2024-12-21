import { Component, signal } from '@angular/core';
import { ModalComponent } from '../shared/ui/modal.component';
import { Checklist } from '../shared/interfaces/checklist';

@Component({
  selector: 'app-home',
  template: `
    <header>
      <h1>Quicklists</h1>
      <button>Add Checklist</button>
    </header>

    <app-modal [isOpen]="false">
      <ng-template>Test</ng-template>
    </app-modal>
  `,
  imports: [ModalComponent],
})
export default class HomeComponent {
  checklistBeingEdited = signal<Partial<Checklist> | null>(null);
}
