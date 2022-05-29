import { Pipe, PipeTransform } from '@angular/core';

/*
 * Filter array by text
*/

@Pipe({
  name: 'searchFilter'
})
export class SearchFilterPipe implements PipeTransform {

  transform(text: string, items: Array<any>, keys?: Array<string>, nestedArrayKey?: any, nestedKeys?: Array<string>): Array<any> {

    // Return all items on empty search
    if (!text) { return items; }

    // If keys not set use all keys
    if (!keys) {
      keys = Object.keys(items[0]);
    }

    // Init empty filtered array
    let filtered = [];

    // Lowercase search text
    let search = text.toLowerCase();

    for (let item of items) {

      for (let k of keys) {
        // Next if item key is null or item is already in filtered array
        if (!item[k] || (filtered.indexOf(item) != -1)) { continue; }
        var key = item[k].toString().toLowerCase()

        // Add item to filter if search match
        if (key.indexOf(search) != -1) {
          filtered.push(item);
        }
      }

      // Handle nested search
      if (nestedKeys) {
        for (let nestedItem of item[nestedArrayKey]) {
          for (let k of nestedKeys) {
            // Next if item key is null or item is already in filtered array
            if (!item[k] || (filtered.indexOf(item) != -1)) { continue; }
            var key = nestedItem[k].toString().toLowerCase()

            // Add item to filter if search match
            if (key.indexOf(search) != -1) {
              filtered.push(item);
            }
          }
        }
      }

    }

    // Return filtered array
    return filtered;
  }

}
