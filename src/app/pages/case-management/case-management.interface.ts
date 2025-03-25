import { ITableHeaderConfig } from '@vks/app/shared/ui-common/table-common/table.common.config';
import { ECaseDepartment } from './models/enums';

// interfaces/case.interface.ts
export interface ICase {
  _id?: string;
  title: string;
  case_id: string;
  department: string;
  type: string;
  description: string;
}

// interfaces/filter-form-case.interface.ts
export interface IFilterFormCase {
  title?: string;
  case_id?: string;
  department?: string;
  type?: string;
  fromDate?: Date;
  toDate?: Date;
}

// models/filter-config.ts
export const FilterConfig = [
  {
    name: 'title',
    label: 'Tiêu đề',
    type: 'text',
    placeholder: 'Nhập tiêu đề',
    col: 3
  },
  {
    name: 'case_id',
    label: 'Mã hồ sơ',
    type: 'text',
    placeholder: 'Nhập mã hồ sơ',
    col: 3
  },
  {
    name: 'department',
    label: 'Phòng ban',
    type: 'select',
    options: ['Dân sự', 'Hình sự'], // Populate from backend or service
    placeholder: 'Chọn phòng ban',
    col: 3
  },
  {
    name: 'type',
    label: 'Loại hồ sơ',
    type: 'select',
    options: ["Ngoại tình", "Từ thiện", "Bỏ con", "Giết người cướp của", "Sukvat"], // Populate from backend or service
    placeholder: 'Chọn loại hồ sơ',
    col: 3
  }
];

// models/config-header.ts
export const ConfigHeader: ITableHeaderConfig[] = [
  { key: 'title', name: 'Tiêu đề' },
  { key: 'case_id', name: 'Mã hồ sơ' },
  { key: 'department', name: 'Phòng ban' },
  { key: 'type', name: 'Loại hồ sơ' },
  { key: 'last_update_date', name: 'Ngày cập nhật' }
];
