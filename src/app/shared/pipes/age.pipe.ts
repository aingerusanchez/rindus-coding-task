import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'age',
  standalone: true,
})
export class AgePipe implements PipeTransform {
  transform(birthDateString?: string /* , ...args: unknown[] */): string {
    if (!birthDateString) return '';

    const today = new Date();
    const birthDate = transformDateFormats(
      birthDateString,
      DateFormat.EUR,
      DateFormat.USA
    );
    let age = today.getFullYear() - birthDate.getFullYear();
    const monthDiff = today.getMonth() - birthDate.getMonth();
    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < birthDate.getDate())
    ) {
      age--;
    }
    if (Number.isNaN(age)) {
      console.error('Malformed date, can`t calculate age', birthDateString);
      return '';
    } else {
      return age.toString();
    }
  }
}

export enum DateFormat {
  EUR, // DD/MM/YYYY
  USA, // MM/DD/YYYY
  ISO, // YYYY-MM-DD
}

function transformDateFormats(
  date: string,
  inputFormat: DateFormat,
  outputFormat: DateFormat
): Date {
  if (inputFormat === DateFormat.EUR && outputFormat === DateFormat.USA) {
    const dateFragments = date.split('/');
    const day = parseInt(dateFragments[0], 10);
    const month = parseInt(dateFragments[1], 10) - 1;
    const year = parseInt(dateFragments[2], 10);

    return new Date(year, month, day);
  }
  return new Date();
}
