import { Pipe, PipeTransform } from '@angular/core';
import { Lists } from '../model/type/listsType';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(value: Lists[], term:string): Lists[] | [] {
    if(!value || term === ''){
      return value
    }
    return value.filter((item)=>{
      return item.name?.includes(term)
    })
  }

}
