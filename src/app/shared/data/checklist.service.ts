import { computed, Injectable, signal } from '@angular/core';
import { AddChecklist, Checklist } from '../interfaces/checklist';
import { Subject } from 'rxjs';

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

  // source which will allow us to emmit into stream
  add$ = new Subject<AddChecklist>();
}
