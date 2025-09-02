import type { IRequest } from './request.interface';
import type { ISysRequestState } from './sys-request-state.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequestState {
  request_id: IRequest['request_id'];
  request_state_id: ISysRequestState['request_state_id'];
  request_state_update_remark: string | null; // size : 255
  request_state_update_by: IViewEmployee['ID'];
  request_state_update_at: string;
}
export type { IRequestState };

