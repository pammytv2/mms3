import type { IViewEmployee, IViewRequest } from '.';
import type {
  IRequestAssignmentAssignee,
  IRequestAssignmentConfirmation,
  IRequestAssignmentData,
} from '..';

interface IViewRequestProcess extends IViewRequest {
  comment: IRequestAssignmentData['comment'];
  confirm_assignment_comment: IRequestAssignmentConfirmation['confirm_assignment_comment'];
  request_assignee: IRequestAssignmentAssignee['request_assignee'];
  request_assignee_cardcode: IViewEmployee['cardcode'];
  request_assignee_name: IViewEmployee['eng_name'];
  request_assigner: IRequestAssignmentData['request_assigner'];
  request_assigner_cardcode: IViewEmployee['cardcode'];
  request_assigner_name: IViewEmployee['eng_name'];
  confirm_assignment_status: IRequestAssignmentConfirmation['confirm_assignment_status'];
}

export type { IViewRequestProcess };
