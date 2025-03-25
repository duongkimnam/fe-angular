import { IDropdownItem, KeyAction } from '@vks/app/shared/models'

export interface FilterFieldConfig {
  name: string // Tên của ô input (dùng để binding dữ liệu)
  label: string // Nhãn của ô input
  type: string // Loại ô input
  col: number // Số lượng cột chiếm trên 12 cột của một hàng
  colGrow?: boolean
  options?: IDropdownItem[] // Danh sách lựa chọn cho select
  placeholder?: string // Placeholder cho input text hoặc date
  action?: KeyAction
  defaultValue?: string | number | boolean
}
