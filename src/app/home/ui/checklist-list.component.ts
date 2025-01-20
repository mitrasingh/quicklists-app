import {
  Component,
  input,
  output,
  effect,
  computed,
  signal,
} from '@angular/core';
import { Checklist, RemoveChecklist } from '../../shared/interfaces/checklist';
import { RouterLink } from '@angular/router';
import { ChecklistItem } from '../../shared/interfaces/checklist-item';

@Component({
  selector: 'app-checklist-list',
  template: `
    <ul>
      @for (checklist of checklists(); track checklist.id) {
      <li>
        <a routerLink="/checklist/{{ checklist.id }}">{{ checklist.title }}</a>
        <span
          >{{ getCheckedItemCount(checklist.id) }} /
          {{ getItemCount(checklist.id) }} items are done</span
        >
        <span>{{ checklist.date }}</span>
        <div>
          <button (click)="edit.emit(checklist)">Edit</button>
          <button (click)="delete.emit(checklist.id)">Delete</button>
        </div>
      </li>
      } @empty {
      <p>Click the add button to create your first checklist!</p>
      }
    </ul>
  `,
  styles: [
    `
      ul {
        padding: 0;
        margin: 0;
      }
      li {
        font-size: 1.5em;
        display: flex;
        justify-content: space-between;
        background: var(--color-light);
        list-style-type: none;
        margin-bottom: 1rem;
        padding: 1rem;

        button {
          margin-left: 1rem;
        }
        span {
          font-size: 0.65em;
        }
      }
    `,
  ],
  imports: [RouterLink],
})
export class ChecklistList {
  checklists = input.required<Checklist[]>();
  checklistItems = input.required<ChecklistItem[]>();
  delete = output<RemoveChecklist>();
  edit = output<Checklist>();

  getItemCount(checklistId: string): number {
    return this.checklistItems().filter(
      (item) => item.checklistId === checklistId
    ).length;
  }
  getCheckedItemCount(checklistId: string): number {
    return this.checklistItems().filter(
      (item) => item.checklistId === checklistId && item.checked
    ).length;
  }
}
