import { Component } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { NbToastrService, NbDialogService } from '@nebular/theme';
import { NbToastStatus } from '@nebular/theme/components/toastr/model';
import { IndexService } from './index.service';
import { AppConfirmComponent } from '../children/confirm/confirm.component';
import { AppDialogNameComponent } from './dialog-name-prompt/dialog-name-prompt.component';

@Component({
  templateUrl: './index.component.html',
  styleUrls: ['index.component.scss'],
  providers: [IndexService],
})
export class AppIndexComponent {
  constructor(
    private dialogService: NbDialogService,
    private indexService: IndexService,
    private toastrService: NbToastrService) {
    indexService.getClassificationInfo().subscribe(value => {
      const data = value[0];
      this.source.load(data);
      this.source.setPaging(1, 5);
    });
  }
  source: LocalDataSource = new LocalDataSource();
  settings = {
    hideSubHeader: true, // hide the [add function] row
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true,
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      name: {
        title: 'Type Name',
        filter: false,
      },
      articleAmount: {
        title: 'Article Amount',
        filter: false,
        editable: false,
      },
      likeAmount: {
        title: 'Like Amount',
        filter: false,
        editable: false,
      },
      commentAmount: {
        title: 'Comment Amount',
        filter: false,
        editable: false,
      },
    },
  };

  onDeleteConfirm(event): void {
    this.dialogService.open(AppConfirmComponent).onClose.subscribe(value => {
      if (value === 'yes') {
        this.indexService.deleteClassificationById(event.data.id).subscribe(result => {
          if (result) {
            event.confirm.resolve();
            this.toastrService.show('', 'Delete Successful', { status: NbToastStatus.SUCCESS });
          } else {
            event.confirm.reject();
            this.toastrService.show('', 'Delete Failed', { status: NbToastStatus.WARNING });
          }
        });
      }
    });
  }
  onEditConfirm(event): void {
    this.indexService.updateClassificationName(event.newData.id, event.newData.name).subscribe(value => {
      if (value) {
        this.toastrService.show('', 'Update Successful', { status: NbToastStatus.SUCCESS });
        event.confirm.resolve();
      } else {
        this.toastrService.show('', 'Update Failed', { status: NbToastStatus.WARNING });
        event.confirm.reject();
      }
    });
  }
  add() {
    this.dialogService.open(AppDialogNameComponent).onClose.subscribe(name => {
      if (name != null) {
        this.indexService.addClassification(name).subscribe(result => {
          this.source.add(result);
          this.source.refresh();
          this.toastrService.show('', 'Add Successful', { status: NbToastStatus.SUCCESS });
        });
      }
    });
  }
}
