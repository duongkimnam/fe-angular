import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'

import { CaseManagementComponent } from './screens/case-management.component'
import { CaseManagementRoutingModule } from './case-management-routing.module'
import { CaseManagementHttpService } from './case-management-http.service'
import { CaseManagementStateService } from './case-management-state.service'
import { FilterCommonComponent } from '../../shared/ui-common/filter-common/filter-common.component'
import { TableCommonComponent } from '../../shared/ui-common/table-common/table-common.component'
import { ButtonDirective, ButtonModule } from 'primeng/button'
import { DialogModule } from 'primeng/dialog'
import { MenuModule } from 'primeng/menu'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { AccountManagementRoutingModule } from '../account-management/account-manamagement-routing.module'
import { ToastModule } from 'primeng/toast'
import { RippleModule } from 'primeng/ripple'
import { InputTextModule } from 'primeng/inputtext'
import { FileUploadModule } from 'primeng/fileupload'
import { DropdownModule } from 'primeng/dropdown'
import { PasswordModule } from 'primeng/password'
import { FormCaseComponent } from './screens/components/form-case/form-case.component'
import { DetailAccountManagementComponent } from '../account-management/screens/detail-account-management/detail-account-management.component'
import { MessageService } from 'primeng/api'

@NgModule({
  declarations: [CaseManagementComponent, FormCaseComponent, DetailAccountManagementComponent],
  imports: [
    CommonModule,
    CaseManagementRoutingModule,
    FilterCommonComponent,
    TableCommonComponent,
    ButtonModule,
    DialogModule,
    MenuModule,
    ReactiveFormsModule,
    AccountManagementRoutingModule,
    ButtonDirective,
    ToastModule,
    RippleModule,
    InputTextModule,
    FileUploadModule,
    DropdownModule,
    PasswordModule,
    FormsModule,
    DropdownModule,
    ToastModule
  ],
  providers: [CaseManagementHttpService, CaseManagementStateService, MessageService],
})
export class CaseManagementModule { }
