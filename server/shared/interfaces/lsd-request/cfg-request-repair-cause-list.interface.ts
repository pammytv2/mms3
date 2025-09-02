import type { ICfgRequestRepairCauseGroup } from './cfg-request-repair-cause-group.interface';

// cfg_request_repair_cause_list
interface ICfgRequestRepairCauseList {
  repair_cause_list_id: number;
  repair_cause_group_id: ICfgRequestRepairCauseGroup['repair_cause_group_id'];
  repair_cause_list_name: string;
  repair_cause_list_order: number;
}

export type { ICfgRequestRepairCauseList };
