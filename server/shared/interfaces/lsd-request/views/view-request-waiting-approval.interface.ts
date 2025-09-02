import type { IViewRequestApprovalHistory } from './view-request-approval-history.interface';

interface IViewRequestWaitingApproval {
  request_id: IViewRequestApprovalHistory['request_id'];
  request_approver: IViewRequestApprovalHistory['request_approver'];
  days_elapsed: number;
}

export type { IViewRequestWaitingApproval };
