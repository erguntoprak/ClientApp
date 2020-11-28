import { Pipe, PipeTransform } from '@angular/core';
import { EducationFilterListModel } from '../shared/models';

@Pipe({
  name: 'educationListFilter'
})
export class EducationListFilterPipe implements PipeTransform {

  transform(items: any[], ...args: any[]): any[] {
    if (!items) return [];
    if (args[0].length < 1 && args[1].length < 1) {
      return items;
    }
    if (args[0].length > 0) {
      items = items.filter(d => args[0].includes(d.districtId));
    }
    if (args[1].length > 0) {
      items = items.filter(d => args[1].every(v => d.attributeIds.includes(v)));
    }
    return items;
  }

}
