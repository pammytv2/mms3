import type {
  ICfgRequestFEJobAction,
  ICfgRequestFEJobGroup,
  ICfgRequestFEJobType,
} from './index';

interface IRequestFEJobFormData {
  job_type: ICfgRequestFEJobType['fe_job_type_id'][];
  job_group: ICfgRequestFEJobGroup['fe_job_group_id'][];
  job_action: ICfgRequestFEJobAction['fe_job_action_id'][];
  update_by: string;
  update_by_name: string;
  update_at: string;
}

export type { IRequestFEJobFormData };
