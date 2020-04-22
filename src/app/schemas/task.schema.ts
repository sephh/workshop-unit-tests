export interface TaskSchema {
  id: string;
  label: string;
  done?: boolean;
  editing?: boolean;
  index: number;
}
