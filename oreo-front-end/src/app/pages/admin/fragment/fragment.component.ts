import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { FragmentService, Fragment } from './fragment.service';
import { AppAdminComponent } from '../admin-basic.component';
import { NgModel } from '@angular/forms';
import { NbDialogService, NbToastrService } from '@nebular/theme';
import { debounceTime, takeUntil } from 'rxjs/operators';
import { AppCreateOrEditFragmentComponent } from './components/create-or-edit-fragment.component';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { AppConfirmComponent } from '../../../global/components/confirm/confirm.component';

@Component({
  selector: 'app-fragment',
  templateUrl: './fragment.component.html',
  styleUrls: ['fragment.component.scss'],
  providers: [FragmentService],
})
export class AppFragmentComponent extends AppAdminComponent implements OnInit, AfterViewInit {
  public selectedObj = new Fragment();

  @ViewChild('searchInput') searchInput: NgModel;

  constructor(
    public fragmentService: FragmentService,
    private dialogService: NbDialogService,
    private toastrService: NbToastrService
  ) {
    super();
  }

  ngOnInit(): void {
    this.tableSettings.columns = {
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
    };
    this.fragmentService.findTableInfo().subscribe(value => {
      this.tableSource.load(value);
      this.tableSource.setPaging(1, 5);
      this.loading = false;
    });
  }

  ngAfterViewInit(): void {
    this.searchInput.valueChanges
      .pipe(debounceTime(300), takeUntil(this.unsubscribe$))
      .subscribe(() => {
        this.fetchTableList();
      });
  }

  public create(dialog: TemplateRef<any>): void {
    this.dialogService.open(AppCreateOrEditFragmentComponent, { context: { operation: 'create' }, ...this.dialogSettings }).onClose.subscribe((v: Fragment) => {
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
            this.selectedObj = new Fragment();
            this.fetchTableList();
          });
        }
      });
    }
  }

  private fetchTableList(): void {
    this.loading = true;
    this.fragmentService.findTableInfo(this.filterInfo).subscribe(value => {
      this.tableSource.load(value);
      this.loading = false;
    });
  }
}
