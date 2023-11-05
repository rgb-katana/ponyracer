import { Pipe, PipeTransform } from '@angular/core';
import { formatDistanceToNowStrict, parseISO } from 'date-fns';

@Pipe({
  name: 'fromNow',
  standalone: true
})
export class FromNowPipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): string {
    const date = parseISO(value);
    const dateFrom = formatDistanceToNowStrict(date, { addSuffix: true });
    return dateFrom;
  }
}
