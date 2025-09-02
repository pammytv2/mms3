import type { IRequestAssignmentData } from './request-assignment-data.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequestAssignmentAssignee {
  assignment_id: IRequestAssignmentData['assignment_id'];
  request_assignee: IViewEmployee['ID'];
}

export type { IRequestAssignmentAssignee };
