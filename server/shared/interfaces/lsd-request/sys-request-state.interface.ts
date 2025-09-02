interface ISysRequestState {
  request_state_id:
    | 'APPROVAL'
    | 'CF-ASSIGN'
    | 'ASSIGNMENT'
    | 'ON-PROCESS'
    | 'REJECTED'
    | 'COMPLETED'
    | 'DELETED';
  request_state_name: string;
  request_state_color: string;
  request_state_status: string;
  request_state_order: number;
  request_state_desc: string;
}

export type { ISysRequestState };
