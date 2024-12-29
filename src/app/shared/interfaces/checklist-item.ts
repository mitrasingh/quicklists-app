export interface ChecklistItem {
  id: string;
  checklistId: string;
  title: string;
  checked: boolean;
}

export type RemoveChecklistItem = ChecklistItem['id'];
