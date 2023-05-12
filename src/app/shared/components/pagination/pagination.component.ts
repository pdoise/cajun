import { Component, OnInit, DoCheck, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { Observable, Subscription, map } from 'rxjs';

@Component({
  selector: 'pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})

export class PaginationComponent implements OnInit, DoCheck, OnDestroy {
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
  recordsSub!: Subscription;

  ngOnInit() {
    this.recordsSub = this.records.subscribe((records: any) => {
      this.total = records.length;
    })
    this.recordsSub.add(this.filteredRecords.subscribe((records: any) => {
      this.collectionSize = records.length;
    }))
  }

  ngDoCheck() {
    this.updateRangeValues();
  }

  ngOnDestroy(): void {
    if (this.recordsSub) { this.recordsSub.unsubscribe(); }
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
