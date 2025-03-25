import { Component, OnInit } from '@angular/core';
import { DEFAULT_TABLE_PAGE, DEFAULT_TABLE_SIZE, KeyAction } from '@vks/app/shared/models';
import {
  ConfigHeaderCase,
  DefaultFilterDataCase,
  FilterConfigCase,
} from '../models/constants';
import { ICaseResponse } from '@vks/app/https/case-management/interface.ts';

import { PaginatorState } from 'primeng/paginator';
import { Router } from '@angular/router';
import { finalize, takeUntil } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';

import { CaseManagementHttpService } from '../case-management-http.service';
import { LoadingService } from '@vks/app/services';
import { FilterConfig, ConfigHeader, ICase, IFilterFormCase } from '../case-management.interface';
import { actionConfig } from '@vks/app/shared/ui-common/table-common/table.common.config';

interface DropdownOption {
  name: string;
  code: string;
}

@Component({
  selector: 'vks-case-management',
  templateUrl: './case-management.component.html',
  styleUrl: './case-management.component.scss',
  providers: [MessageService],
})
export class CaseManagementComponent implements OnInit {
  readonly title = 'Danh sách vụ án';
  readonly filterConfig = FilterConfig;
  readonly configHeader = ConfigHeader;

  departmentOptions: DropdownOption[] = [
    { name: 'Hình sự', code: 'Hình sự' },
    { name: 'Dân sự', code: 'Dân sự' }
  ];

  // Dropdown options for case types
  caseTypeOptions: DropdownOption[] = [
    { name: 'Ngoại tình', code: 'Ngoại tình' },
    { name: 'Từ thiện', code: 'Từ thiện' },
    { name: 'Bỏ con', code: 'Bỏ con' },
    { name: 'Giết người cướp của', code: 'Giết người cướp của' },
    { name: 'Sukvat', code: 'Sukvat' }
  ];

  ListAccountActionConfig: actionConfig[] = [
    { label: 'Cập nhật', icon: 'pi pi-file-edit', key: KeyAction.UPDATE },
    { label: 'Xoá', icon: 'pi pi-trash', key: KeyAction.REMOVE },
  ];
  actionConfig = [...this.ListAccountActionConfig];
  listCase: ICase[] = [];
  totalRecords = 0;
  page = 1;
  pageSize = 10;
  isVisibleModal = false;

  newCase: ICase = {
    title: '',
    case_id: '',
    department: '',
    type: '',
    description: ''
  };

  defaultFilterData: IFilterFormCase = {
    title: '',
    case_id: '',
    department: '',
    type: ''
  };

  constructor(
    private caseManagementHttpService: CaseManagementHttpService,
    private loadingService: LoadingService,
    private router: Router,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.handleGetCaseManagement();
  }

  onPageChange(page: PaginatorState) {
    this.page = (page.page ?? 0) + 1;
    this.pageSize = page.rows ?? 10;
    this.handleGetCaseManagement();
  }

  onSearch(data: string) {
    this.defaultFilterData.title = data;
    this.handleGetCaseManagement();
  }

  onFilter(filter: IFilterFormCase) {
    this.handleFilterCaseManagement(filter);
  }

  onEdit(item: ICase) {
    console.log('Dữ liệu edit', item);
    // Implement edit logic
  }

  onDelete(item: ICase) {
    this.loadingService.showLoading(true);
    if (item._id) {
      this.caseManagementHttpService.deleteCase<ICase>(item._id)
        .pipe(
          finalize(() => this.loadingService.showLoading(false))
        )
        .subscribe({
          next: () => {
            this.handleGetCaseManagement();
          },
          error: (error) => {
            console.error('Delete error', error);
          }
        });
    } else {
      console.error('Delete error: item._id is undefined');
    }
  }

  onOpenModal() {
    this.newCase = {
      title: '',
      case_id: '',
      department: '',
      type: '',
      description: ''
    };
    this.isVisibleModal = true;
  }

  onCloseModal() {
    this.isVisibleModal = false;
  }

  onDoubleClickRow(item: ICase) {
    // Navigate to case detail page
    this.router.navigate(['case-management/detail'], {
      queryParams: { caseId: item._id }
    });
  }

  onSubmit(formData: ICase) {
    this.loadingService.showLoading(true);
    this.caseManagementHttpService.createCase<ICase>(formData)
      .pipe(
        finalize(() => this.loadingService.showLoading(false))
      )
      .subscribe({
        next: () => {
          this.onCloseModal();
          this.handleGetCaseManagement();
          // Success toast
          this.messageService.add({
            severity: 'success',
            summary: 'Thành công',
            detail: 'Tạo vụ án mới thành công'
          });
        },
        error: (error) => {
          console.error('Create case error', error);
          // Error toast
          this.messageService.add({
            severity: 'error',
            summary: 'Lỗi',
            detail: error.message || 'Có lỗi xảy ra khi tạo vụ án'
          });
          this.onCloseModal();
        }
      });
  }

  handleGetCaseManagement() {
    this.loadingService.showLoading(true);
    this.caseManagementHttpService
      .getListCase()
      .pipe(
        finalize(() => this.loadingService.showLoading(false))
      )
      .subscribe({
        next: (response) => {
          console.log('Get case list response', response);
          if (response) {
            this.listCase = response;
            this.totalRecords = response.length;
          }
        },
        error: (error) => {
          console.error('Get case list error', error);
        }
      });
  }

  handleFilterCaseManagement(query: IFilterFormCase) {
    this.loadingService.showLoading(true);
    this.caseManagementHttpService
      .getCaseFiltered(query)
      .pipe(
        finalize(() => this.loadingService.showLoading(false))
      )
      .subscribe({
        next: (response) => {
          console.log('Get case filtered', response);
          if (response) {
            this.listCase = response;
            this.totalRecords = response.length;
          }
        },
        error: (error) => {
          console.error('Get case list error', error);
        }
      });
  }
}
