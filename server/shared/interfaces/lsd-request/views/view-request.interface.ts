import type { ICfgRequestProcess } from '../cfg-request-process.interface';
import type { ICfgRequestSystem } from '../cfg-request-system.interface';
import type { IRequest } from '../request.interface';
import type { ISysRequestState } from '../sys-request-state.interface';
import type { IViewEmployee } from './view-employee.interface';

interface IViewRequest {
  request_id: IRequest['request_id'];
  request_title: IRequest['request_title'];
  request_description: IRequest['request_description'];
  request_by: IRequest['request_by'];
  request_by_group_code: IRequest['request_by_group_code'];
  request_by_section_code: IRequest['request_by_section_code'];
  request_by_executive_code: IRequest['request_by_executive_code'];
  request_at: IRequest['request_at'];
  request_init_approver: IRequest['request_init_approver'];
  request_init_approver_position: IRequest['request_init_approver_position'];
  request_needdate: IRequest['request_needdate'];
  request_duedate: IRequest['request_duedate'];
  request_total_expenses: IRequest['request_total_expenses'];
  request_total_save_costs: IRequest['request_total_save_costs'];
  request_edit_mode: IRequest['request_edit_mode'];

  // -- join [tb_employee] --
  requestor_name: IViewEmployee['eng_name'];
  requestor_group_name: IViewEmployee['group_name'];
  requestor_cardcode: IViewEmployee['cardcode'];
  init_approver_name: IViewEmployee['eng_name'];

  // -- join [cfg_request_system] --
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_system_name: ICfgRequestSystem['request_system_name'];
  request_system_desc: ICfgRequestSystem['request_system_desc'];

  // -- join [cfg_request_process] --
  request_process_id: ICfgRequestProcess['request_process_id'];
  request_process_name: ICfgRequestProcess['request_process_name'];
  request_process_color: ICfgRequestProcess['request_process_color'];
  request_process_level: ICfgRequestProcess['request_process_level'];

  // -- join [sys_request_state] --
  request_state_id: ISysRequestState['request_state_id'];
  request_state_name: ISysRequestState['request_state_name'];
  request_state_status: ISysRequestState['request_state_status'];
  request_state_color: ISysRequestState['request_state_color'];
}

export type { IViewRequest };
