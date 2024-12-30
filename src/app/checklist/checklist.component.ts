import { Component, computed, inject, signal } from '@angular/core';
import { ChecklistService } from '../shared/data/checklist.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { ChecklistHeaderComponent } from './ui/checklist-header.component';
import { ChecklistItemService } from './data/checklist-item.service';
import { ChecklistItem } from '../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist',
  template: `
    @if (checklist(); as checklist) {
    <app-checklist-header [checklist]="checklist" />
    }
  `,
  imports: [ChecklistHeaderComponent],
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  checklistItemService = inject(ChecklistItemService);

  checklistItemBeingEdited = signal<Partial<ChecklistItem> | null>(null);

  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);

  checklist = computed(() =>
    this.checklistService
      .checklists()
      .find((checklist) => checklist.id === this.params()?.get('id'))
  );
}
