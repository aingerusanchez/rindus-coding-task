import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(value?: string /* , ...args: unknown[] */): string {
    if (!value) return '';

    const today = new Date();
    const birthDate = new Date(value);
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (Number.isNaN(age)) {
      console.error('Malformed date, can`t calculate age', value);
      return '';
    } else {
      return age.toString();
    }
  }
}
