import { Component, OnInit, DoCheck, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, map, firstValueFrom } from 'rxjs';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, DoCheck {
  @Input() records!: any;
  @Input() filteredRecords!: any;
  @Input() page: number = 1;
  @Input() pageSize: number = 10;
  @Input() label!: string;
  @Output() private pageChanged = new EventEmitter<any>();
  total!: any;
  collectionSize!: any;
  recordsSubscription!: Subscription;
  range!: string;
  lower!: number;
  upper!: number;

  ngOnInit() {
    firstValueFrom(this.records).then((records: any) => {
      this.total = records.length;
    })
    firstValueFrom(this.filteredRecords).then((records: any) => {
      this.collectionSize = records.length;
    })
  }

  ngDoCheck() {
    this.updateRangeValues();
  }

  pageChange() {
    this.pageChanged.emit(this.page);
    this.updateRangeValues();
  }

  updateRangeValues() {
    this.lower = (this.page - 1) * this.pageSize + 1;
    this.upper = Math.min(this.page * this.pageSize, this.collectionSize);
    this.total = this.collectionSize;
  }

  get recordLength(): Observable<number> {
    return this.records.pipe(map((records: any) => { return records.length }));
  }

  get hasFilteredRecord(): Observable<boolean> {
    return this.filteredRecords.pipe(map((records: any) => { return records.length > 0 }));
  }
}
