export type Position = 'Senior' | 'Junior' | 'Other';

export interface Employee {
  id: number;
  /** URL of the employee's avatar */
  avatar: string;
  name: string;
  surname: string;
  email: string;
  /** Birth date in MM/DD/YYYY format */
  birthDate: string;
  position: Position;
  /**
   * Alternative position (optional)
   * Only filled when position is 'Other'
   */
  altPos?: string;
}
