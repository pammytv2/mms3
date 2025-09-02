import type { IViewEmployee, IViewRequest } from './views';

interface IRequestAssignmentConfirmation {
  request_id: IViewRequest['request_id'];
  confirm_assignment_status?: 0 | 1;
  confirm_assignment_comment?: string; // size 1000
  confirm_assignment_by?: IViewEmployee['ID'];
  confirm_assignment_at?: string;
}

export type { IRequestAssignmentConfirmation };
