import type { ICfgRequestApprovalFlow } from '../cfg-request-approval-flow.interface';
import type { ICfgRequestApprovalStatus } from '../cfg-request-approval-status.interface';
import type { IRequestApproval } from '../request-approval.interface';
import type { IRequest } from '../request.interface';
import type { ISysApproverPosition } from '../sys-approver-position.interface';
import type { IViewEmployee } from './view-employee.interface';

interface IViewRequestApprovalHistory {
  // Find Union of [Waiting, Approved , Next Approver]
  request_id: IRequest['request_id'];
  request_approver_position: IRequestApproval['next_approver_position'];
  approver_level: ICfgRequestApprovalFlow['approver_level'];
  approver_position_name: ISysApproverPosition['approver_position_name'];
  request_approver: IRequestApproval['next_approver'];
  cardcode: IViewEmployee['cardcode'];
  eng_name: IViewEmployee['eng_name'];
  position_name: IViewEmployee['position_name'];
  section_name: IViewEmployee['section_name'];
  request_approval_status_name: ICfgRequestApprovalStatus['request_approval_status_name'];
  request_approval_status_color: ICfgRequestApprovalStatus['request_approval_status_color'];
  request_approval_comment: IRequestApproval['request_approval_comment'] | null;
  request_approval_at: IRequestApproval['request_approval_at'] | null;
  record_type: 1 | 2 | 3; // [Waiting, Approved , Next Approver]
  rn: number; // latest approver_level
}

export type { IViewRequestApprovalHistory };
