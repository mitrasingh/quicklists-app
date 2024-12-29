import { Component, computed, inject } from '@angular/core';
import { ChecklistService } from '../shared/data/checklist.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-checklist',
  template: `<p>checklist</p>`,
})
export default class ChecklistComponent {
  checklistService = inject(ChecklistService);
  route = inject(ActivatedRoute);

  params = toSignal(this.route.paramMap);
}
