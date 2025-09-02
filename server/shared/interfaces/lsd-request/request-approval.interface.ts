import type { ICfgRequestApprovalStatus } from './cfg-request-approval-status.interface';
import type { IRequest } from './request.interface';
import type { ISysApproverPosition } from './sys-approver-position.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequestApproval {
  request_id: IRequest['request_id'];
  request_approver_position: ISysApproverPosition['approver_position'];
  request_approver: IViewEmployee['ID'];
  next_approver_position: ISysApproverPosition['approver_position'];
  next_approver: IViewEmployee['ID'];
  request_approval_at: string;
  request_approval_status_id: ICfgRequestApprovalStatus['request_approval_status_id'];
  request_approval_comment: string | null;
}

export type { IRequestApproval };

