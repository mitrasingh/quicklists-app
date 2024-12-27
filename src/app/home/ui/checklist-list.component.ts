import { Component, input } from '@angular/core';
import { Checklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  template: `
    <h1>Checklist list</h1>
    @for (checklist of checklists(); track checklist.id) {
    <p>{{ checklist.title }}</p>
    }
  `,
})
export class ChecklistList {
  checklists = input.required<Checklist[]>();
}
