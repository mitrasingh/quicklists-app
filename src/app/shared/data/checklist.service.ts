import { computed, inject, Injectable, signal } from '@angular/core';
import {
  AddChecklist,
  Checklist,
  RemoveChecklist,
} from '../interfaces/checklist';
import { Subject } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StorageService } from './storage.service';

export interface ChecklistsState {
  checklists: Checklist[];
  loaded: boolean;
  error: string | null;
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  storageService = inject(StorageService);

  // state for checklists
  private state = signal<ChecklistsState>({
    checklists: [],
    loaded: false,
    error: null,
  });

  // selector to gain access to state
  checklists = computed(() => this.state().checklists);

  // source which will allow us to emmit into stream
  private checklistsLoaded$ = this.storageService.loadChecklists();
  add$ = new Subject<AddChecklist>();

  constructor() {
    // reducers
    this.add$.pipe(takeUntilDestroyed()).subscribe((checklist) =>
      this.state.update((state) => ({
        ...state,
        checklists: [...state.checklists, this.addIdToChecklist(checklist)],
      }))
    );

    this.checklistsLoaded$.pipe(takeUntilDestroyed()).subscribe((checklists) =>
      this.state.update((state) => ({
        ...state,
        checklists,
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
