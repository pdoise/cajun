import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { Collection } from 'src/app/shared/models/collection';
import { SearchFilterPipe } from 'src/app/shared/pipes/search-filter.pipe';

@Component({
  selector: 'checkbox-select',
  templateUrl: './checkbox-select.component.html',
  styleUrls: ['./checkbox-select.component.scss']
})

export class CheckboxSelectComponent implements OnInit {
  @Input() collection!: Collection;
  @Input() label!: string;
  @Input() key!: string;
  @Output() private setRecords = new EventEmitter<any>();
  private all: any;
  public textSearch!: string;

  ngOnInit() {
    console.log(this.collection);
    this.all = { ...this.collection };
  }

  public set(record: any): void {
    record.$selected = !record.$selected;
    this.setRecords.emit();
  }

  public toggleAll(): void {
    this.collection.toggleSelectAll();
    this.setRecords.emit();
  }

  public search(text: any): void {
    this.textSearch = text;
    this.applyFilters();
  }

  private applyFilters(): void {
    let filtered = this.all.records || [];
    filtered = new SearchFilterPipe().transform(this.textSearch, filtered, [this.key]);
    this.collection.set(filtered);
  }

  public trackByFn(index: number, obj: any): number { return obj.id; }
}
