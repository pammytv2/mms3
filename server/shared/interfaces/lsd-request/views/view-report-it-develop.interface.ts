import type { ICfgITDevSystem } from '../cfg-it-dev-system.interface';
import type { IRequestState } from '../request-state.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportITDevelop extends IViewRequest {
  processing_days: number;
  // -- join [view_request_it_dev_system] --
  it_dev_system_name: ICfgITDevSystem['it_dev_system_name'];
  // -- join [tb_request_state] --
  final_approve_at: IRequestState['request_state_update_at'];
  completed_at: IRequestState['request_state_update_at'];
}

export type { IViewReportITDevelop };
