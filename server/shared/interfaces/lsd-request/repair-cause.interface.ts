import type { ICfgRequestRepairCauseList } from './cfg-request-repair-cause-list.interface';
import type { IRequestRepairCause } from './request-repair-cause.interface';

interface IRepairCauseSelected {
  repair_cause_id: IRequestRepairCause['repair_cause_id'];
  request_id: IRequestRepairCause['request_id'];
  hardware_it_sn: IRequestRepairCause['hardware_it_sn'];
  computer_id : IRequestRepairCause['computer_id'];
  no_have_it_sn: boolean;
  repair_cause_remark: IRequestRepairCause['repair_cause_remark'];
  repair_cause_list: ICfgRequestRepairCauseList['repair_cause_list_id'][];
}

export type { IRepairCauseSelected };
