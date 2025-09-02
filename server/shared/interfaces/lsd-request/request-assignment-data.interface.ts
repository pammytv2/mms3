import type { IViewEmployee, IViewRequest } from './views';

interface IRequestAssignmentData {
  assignment_id: string;
  request_id: IViewRequest['request_id'];
  request_assigner: IViewEmployee['ID'];
  comment: string; // size 1000
  is_assignment: 0 | 1;
  assign_at: string;
}

export type { IRequestAssignmentData };

