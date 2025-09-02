import type {
  ICfgRequestFEJobAction,
  IRequest,
} from '@/shared/interfaces/lsd-request';

interface IRequestAssignmentFEJobAction {
  request_id: IRequest['request_id'];
  fe_job_action_id: ICfgRequestFEJobAction['fe_job_action_id'];
  update_at: string;
  update_by: string;
  update_by_name?: string;
}
export type { IRequestAssignmentFEJobAction };
