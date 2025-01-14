export interface Checklist {
  id: string;
  title: string;
  date: string;
}

export type AddChecklist = Omit<Checklist, 'id' | 'date'>;
export type EditChecklist = { id: Checklist['id']; data: AddChecklist };
export type RemoveChecklist = Checklist['id'];
