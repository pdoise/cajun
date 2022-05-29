import { Pipe, PipeTransform } from '@angular/core';
/*
 * Remove all key values pairs except for provided keys ['foo', 'bar']
*/
@Pipe({name: 'whitelistKeys'})

export class WhitelistKeysPipe implements PipeTransform {

  transform(object: any, keys: Array<string>): any {
    let ob = {...object}

    Object.keys(ob).forEach( (k) => {
      if (!keys.includes(k)) { delete ob[k]; }
    })

    return ob;
  }
}