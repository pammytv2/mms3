import type { IRequestState } from '../request-state.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportFERequest extends IViewRequest {
  // -- join [tb_request_state] --
  final_approve_at: IRequestState['request_state_update_at'];
  completed_at: IRequestState['request_state_update_at'];

  processing_days: number;

  charge_cost: string;
  budget_type: string;
  budget_number: string;
}

export type { IViewReportFERequest };
