import type { IHardwareData } from '../../it-service/hardware.interface';
import type { IRequestState } from '../request-state.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportITServiceCall extends IViewRequest {
  symptoms: string;
  hardware_it_sn: IHardwareData['hardware_it_sn'];
  hardware_type_name: IHardwareData['hardware_type_name'];
  priority_class: IHardwareData['priority_class'];
  processing_days: number;
  // -- join [tb_request_state] --
  final_approve_at: IRequestState['request_state_update_at'];
  completed_at: IRequestState['request_state_update_at'];
}

export type { IViewReportITServiceCall };
