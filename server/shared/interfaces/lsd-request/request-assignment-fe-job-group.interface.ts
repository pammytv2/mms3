import type {
  ICfgRequestFEJobGroup,
  IRequest,
} from '@/shared/interfaces/lsd-request';

interface IRequestAssignmentFEJobGroup {
  request_id: IRequest['request_id'];
  fe_job_group_id: ICfgRequestFEJobGroup['fe_job_group_id'];
}
export type { IRequestAssignmentFEJobGroup };
