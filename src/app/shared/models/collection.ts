import { Injectable } from '@angular/core';

import { NaturalSort } from './natural-sort';


@Injectable({
  providedIn: 'root'
})
export class Collection {
  records!: Array<any>;
  reversed!: boolean;
  sortKey!: string;

  constructor(records: Array<any>) {
    this.set(records);
  }

  set(records: Array<any>): void {
    this.records = records;
  }

  sortBy(key: string): any {
    this.sortKey = key;
    this.records.sort( new NaturalSort().sort(key) );
    this.reversed = false;
    return this;
  }

  reverseSortBy(sortKey: string): any {
    this.sortBy(sortKey);
    this.records.reverse();
    this.reversed = true;
    return this;
  }

  toggleSort(key: string): void {
    if (!this.reversed) {
      this.reverseSortBy(key);
    } else {
      this.sortBy(key);
    }
  }

  where(key: string, value: any): any {
    let records = [];
    for (let record of this.records) {
      if (record[key] == value) {
        records.push(record);
      }
    }
    return new Collection(records);
  }

  pluck(param: any) {
    let plucked = []
    for (let item of this.records) {
      plucked.unshift(item[param]);
    }
    return plucked
  }

  get selected() {
    return this.where('$selected', true).records;
  }

  toggleSelect(record: any) {
    record.$selected = !record.$selected;
  }

  deSelect(record: any) {
    record.$selected = false;
  }

  toggleSelectAll() {
    let selectAll = this.allSelected ? false : true;
    return this.records.map((record) => { return record.$selected = selectAll; } )
  }

  unselectAll() {
    return this.records.map((record) => { return record.$selected = false; } )
  }

  get allSelected(): boolean {
    return this.records.every((record) => { return record.$selected; } )
  }

  get hasRecords(): boolean {
    return !!(this.records.length);
  }
}
