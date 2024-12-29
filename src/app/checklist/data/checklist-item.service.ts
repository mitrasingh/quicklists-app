import { computed, Injectable, signal } from '@angular/core';
import {
  AddChecklistItem,
  ChecklistItem,
} from '../../shared/interfaces/checklist-item';
import { Subject } from 'rxjs';

export interface ChecklistItemsState {
  checklistItems: ChecklistItem[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistItemService {
  // state
  private state = signal<ChecklistItemsState>({
    checklistItems: [],
  });

  // selectors
  checklistItems = computed(() => this.state().checklistItems);

  // sources
  add$ = new Subject<AddChecklistItem>();
}
