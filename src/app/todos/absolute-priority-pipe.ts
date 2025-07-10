import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'absolutePriority'
})
export class AbsolutePriorityPipe implements PipeTransform {

  transform(priority: number): number {
    if (typeof priority !== 'number') {
      return 1; // Default value if not a number
    }
    
    // Convert negative priority to positive
    return Math.abs(priority);
  }

}
