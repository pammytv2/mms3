import type { ICfgRequestSystem } from './cfg-request-system.interface';
import type { ISysApproverPosition } from './sys-approver-position.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequest {
  request_id: number;
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_by: IViewEmployee['ID'];
  request_by_group_code: IViewEmployee['GRPCD'];
  request_by_section_code: IViewEmployee['SECCD'];
  request_by_executive_code: IViewEmployee['ExeOfficeCode'];
  request_at: string;
  request_title: string;
  request_description: string | null;
  request_total_expenses: number | null;
  request_total_save_costs: number | null;
  request_other_expenses: number | null;
  request_other_expenses_invoice: string | null;
  request_needdate: string | null;
  request_duedate: string | null;
  request_init_approver: IViewEmployee['ID'];
  request_init_approver_position: ISysApproverPosition['approver_position'];
  request_edit_mode: boolean;
}
export type { IRequest };
