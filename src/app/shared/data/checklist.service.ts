import { computed, Injectable, signal } from '@angular/core';
import { AddChecklist, Checklist } from '../interfaces/checklist';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

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

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      }))
    );
  }

  private addIdToChecklist(checklist: AddChecklist) {
    return {
      ...checklist,
      id: this.generateSlug(checklist.title),
    };
  }

  private generateSlug(title: string) {
    let slug = title.toLowerCase().replace(/\s+/g, '-');

    const matchingSlugs = this.checklists().find(
      (checklist) => checklist.id === slug
    );

    if (matchingSlugs) {
      slug = slug + Date.now().toString();
    }

    return slug;
  }
}
