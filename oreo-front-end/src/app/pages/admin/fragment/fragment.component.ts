import { Component, OnInit, OnDestroy, TemplateRef, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { Subscription, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';
import { FragmentService, Fragment } from './fragment.service';
import { AppCreateOrEditFragmentComponent } from './components/create-or-edit-fragment.component';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['fragment.component.scss'],
  providers: [FragmentService],
})
export class AppFragmentComponent implements OnInit, AfterViewInit, OnDestroy {
  private unsubscribe$ = new Subject<void>();

  public loading = true;
  public filterName: string;
  public source: LocalDataSource = new LocalDataSource();
  public fetchTableList$ = new Subject();
  public selectedObj = new Fragment();
  public settings = {
    actions: false,
    hideSubHeader: true,
    noDataMessage: '暂无数据',
    columns: {
      name: {
        title: '碎片名称',
        editable: false,
        filter: false,
      },
      title: {
        title: '碎片标题',
        editable: false,
        filter: false,
      },
      usersAmount: {
        title: '用户获得数',
        editable: false,
        filter: false,
      }
    },
  };

  @ViewChild('searchInput') searchInput: NgModel;

  constructor(
    private fragmentService: FragmentService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.fragmentService.findTableInfo().subscribe(value => {
      this.source.load(value);
      this.source.setPaging(1, 5);
      this.loading = false;
    });
    this.fetchTableList$.pipe(debounceTime(300)).subscribe(() => {
      this.fetchTableList();
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchTableList();
      });
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

  public onRowSelect(e): void {
    this.selectedObj = e.data;
  }

  public create(dialog: TemplateRef<any>): void {
    this.dialogService.open(AppCreateOrEditFragmentComponent, { context: { operation: 'create' }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: Fragment) => {
      if (v) {
        this.fragmentService.save(v).subscribe(() => this.fetchTableList());
      }
    });
  }

  public edit(): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.fragmentService.findDetail(this.selectedObj.id).subscribe((fragment: Fragment) => {
        this.dialogService.open(AppCreateOrEditFragmentComponent, { context: { operation: 'edit', data: fragment }, closeOnEsc: false, hasBackdrop: false }).onClose.subscribe((v: Fragment) => {
          if (v) {
            this.fragmentService.save(v).subscribe(() => {
              this.fetchTableList();
            });
          }
        });
      });
    }
  }

  public delete(): void {
    if (!this.selectedObj.id) {
      this.toastrService.show('', '请选择记录', { status: NbToastStatus.WARNING });
    } else {
      this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
        if (value === 'yes') {
          this.fragmentService.delete(this.selectedObj.id).subscribe(() => {
            this.fetchTableList();
          });
        }
      });
    }
  }

  private fetchTableList(): void {
    this.loading = true;
    this.fragmentService.findTableInfo(this.filterName).subscribe(value => {
      this.source.load(value);
      this.loading = false;
    });
  }
}
