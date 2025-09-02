import type {
  ICfgRequestFEJobType,
  IRequest,
} from '@/shared/interfaces/lsd-request';

interface IRequestAssignmentFEJobType {
  request_id: IRequest['request_id'];
  fe_job_type_id: ICfgRequestFEJobType['fe_job_type_id'];
}
export type { IRequestAssignmentFEJobType };
