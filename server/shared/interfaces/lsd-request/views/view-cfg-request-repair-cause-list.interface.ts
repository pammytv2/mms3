import type { ICfgRequestRepairCauseGroup } from '../cfg-request-repair-cause-group.interface';
import type { ICfgRequestRepairCauseList } from '../cfg-request-repair-cause-list.interface';

interface IViewCfgRequestRepairCauseList
  extends ICfgRequestRepairCauseList,
    ICfgRequestRepairCauseGroup {}

interface IViewCfgRequestRepairCauseListItem {
  label: ICfgRequestRepairCauseList['repair_cause_list_name'];
  value: ICfgRequestRepairCauseList['repair_cause_list_id'];
}

interface IViewCfgRequestRepairCauseList4MutipleSelect {
  label: ICfgRequestRepairCauseGroup['repair_cause_group_name'];
  items: IViewCfgRequestRepairCauseListItem[];
}

export type {
  IViewCfgRequestRepairCauseList,
  IViewCfgRequestRepairCauseList4MutipleSelect,
};
