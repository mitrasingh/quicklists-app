import { Component, input } from '@angular/core';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-item-list',
  template: ` <div></div> `,
})
export class ChecklistItemListComponent {
  checklistItems = input.required<ChecklistItem[]>();
}
