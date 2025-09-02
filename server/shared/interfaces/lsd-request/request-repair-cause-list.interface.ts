import type { ICfgRequestRepairCauseList } from './cfg-request-repair-cause-list.interface';
import type { IRequestRepairCause } from './request-repair-cause.interface';

// tb_request_repair_cause_list
interface IRequestRepairCauseList {
  repair_cause_id: IRequestRepairCause['repair_cause_id'];
  repair_cause_list_id: ICfgRequestRepairCauseList['repair_cause_list_id'];
}

export type { IRequestRepairCauseList };
