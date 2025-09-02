import type { IViewRequestApprovalHistory } from './view-request-approval-history.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewRequestApproval extends IViewRequest {
  // --- *** view_request_approval_history *** ---
  request_approver: IViewRequestApprovalHistory['request_approver'];
  request_approver_position: IViewRequestApprovalHistory['request_approver_position'];
  approver_position_name: IViewRequestApprovalHistory['approver_position_name'];
  position_name: IViewRequestApprovalHistory['position_name'];
  section_name: IViewRequestApprovalHistory['section_name'];
  request_approval_status_name: IViewRequestApprovalHistory['request_approval_status_name'];
  request_approval_status_color: IViewRequestApprovalHistory['request_approval_status_color'];
  request_approval_comment: IViewRequestApprovalHistory['request_approval_comment'];
  request_approval_at: IViewRequestApprovalHistory['request_approval_at'];
}

export type { IViewRequestApproval };
