import type { ISysRequestState } from '../sys-request-state.interface';

interface IViewRequestState {
  request_state_id: ISysRequestState['request_state_id'];
  request_state_name: ISysRequestState['request_state_name'];
  request_state_color: ISysRequestState['request_state_color'];
  request_state_status: ISysRequestState['request_state_status'];
  request_state_order: ISysRequestState['request_state_order'];
  request_state_desc: ISysRequestState['request_state_desc'];
}

export type { IViewRequestState };
