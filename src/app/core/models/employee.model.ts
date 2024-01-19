export type Position = 'Senior' | 'Junior' | 'Other';

export interface Employee {
  id: number;
  avatar: string;
  name: string;
  surname: string;
  email: string;
  birthDate: string;
  position: Position;
  altPos?: string;
}
