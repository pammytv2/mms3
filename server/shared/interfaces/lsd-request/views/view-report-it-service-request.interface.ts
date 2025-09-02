import type { IRequestState } from '../request-state.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportITServiceRequest extends IViewRequest {
  service_type: string;
  processing_days: number;
  // -- join [tb_request_state] --
  final_approve_at: IRequestState['request_state_update_at'];
  completed_at: IRequestState['request_state_update_at'];
}

export type { IViewReportITServiceRequest };
