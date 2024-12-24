import { computed, Injectable, signal } from '@angular/core';
import { Checklist } from '../interfaces/checklist';

export interface ChecklistsState {
  checklists: Checklist[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  // state for checklists
  private state = signal<ChecklistsState>({
    checklists: [],
  });

  // selector to gain access to state
  checklists = computed(() => this.state().checklists);
}
