import { Component, input } from '@angular/core';
import { Checklist } from '../../shared/interfaces/checklist';

@Component({
  selector: 'app-checklist-list',
  template: `<h1>Checklist list</h1>`,
})
export class ChecklistList {
  checklists = input.required<Checklist[]>();
}
