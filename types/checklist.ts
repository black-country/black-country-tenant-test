// types/checklist.ts
export interface ChecklistItem {
    id: string
    itemName: string
    group: string
    createdAt: string
  }
  
  export interface ChecklistResponse {
    id: string
    itemName: string
    group: string
    state: 'good' | 'bad'
    createdAt: string
  }
  
  export interface GroupedChecklist {
    [key: string]: ChecklistItem[]
  }
  
  export interface GroupedResponse {
    [key: string]: ChecklistResponse[]
  }
  