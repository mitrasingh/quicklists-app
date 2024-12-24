import { Injectable, signal } from '@angular/core';
import { Checklist } from '../interfaces/checklist';

export interface ChecklistsState {
  checklists: Checklist[];
}

@Injectable({
  providedIn: 'root',
})
export class ChecklistService {
  private state = signal<ChecklistsState>({
    checklists: [],
  });
}
