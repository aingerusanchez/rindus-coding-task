import { Pipe, PipeTransform } from '@angular/core';
import { capitalize } from '@shared/utils';

@Pipe({
  name: 'fullName',
  standalone: true,
})
export class FullNamePipe implements PipeTransform {
  transform<T extends { name?: string; surname?: string }>({
    name,
    surname,
  }: T): string {
    return `${capitalize(name)} ${capitalize(surname)}`;
  }
}
