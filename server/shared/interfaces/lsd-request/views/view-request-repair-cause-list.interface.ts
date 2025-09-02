import type { Computer } from '../../it-service/computer.interface';
import type { ICfgRequestRepairCauseGroup } from '../cfg-request-repair-cause-group.interface';
import type { ICfgRequestRepairCauseList } from '../cfg-request-repair-cause-list.interface';
import type { IRequestRepairCause } from '../request-repair-cause.interface';
import type { IViewEmployee } from './view-employee.interface';

interface IViewRequestRepairCauseList {
  repair_cause_id: IRequestRepairCause['repair_cause_id'];
  request_id: IRequestRepairCause['request_id'];
  hardware_it_sn: IRequestRepairCause['hardware_it_sn'];
  computer_id: IRequestRepairCause['computer_id'];
  computer_name: Computer['computer_name'];
  repair_cause_remark: IRequestRepairCause['repair_cause_remark'];
  repair_cause_group_id: ICfgRequestRepairCauseGroup['repair_cause_group_id'];
  repair_cause_group_name: ICfgRequestRepairCauseGroup['repair_cause_group_name'];
  repair_cause_group_order: ICfgRequestRepairCauseGroup['repair_cause_group_order'];
  repair_cause_list_id: ICfgRequestRepairCauseList['repair_cause_list_id'];
  repair_cause_list_name: ICfgRequestRepairCauseList['repair_cause_list_name'];
  repair_cause_list_order: ICfgRequestRepairCauseList['repair_cause_list_order'];
  update_by: IViewEmployee['ID'];
  update_by_name: IViewEmployee['eng_name'];
  update_at: string;
}

interface IRepairCauseGroup {
  repair_cause_group_name: ICfgRequestRepairCauseGroup['repair_cause_group_name'];
  repair_cause_group_order: ICfgRequestRepairCauseGroup['repair_cause_group_order'];
  repair_cause_list: IRepairCauseList[];
}

interface IRepairCauseList {
  repair_cause_list_name: ICfgRequestRepairCauseList['repair_cause_list_name'];
  repair_cause_list_order: ICfgRequestRepairCauseList['repair_cause_list_order'];
}

interface IViewRequestRepairCauseListGroup {
  repair_cause_id: IViewRequestRepairCauseList['repair_cause_id'];
  request_id: IViewRequestRepairCauseList['request_id'];
  hardware_it_sn: IViewRequestRepairCauseList['hardware_it_sn'];
  computer_id: IViewRequestRepairCauseList['computer_id'];
  computer_name: IViewRequestRepairCauseList['computer_name'];
  repair_cause_remark: IViewRequestRepairCauseList['repair_cause_remark'];
  repair_cause_group: IRepairCauseGroup[];
  update_by: IViewEmployee['ID'];
  update_by_name: IViewEmployee['eng_name'];
  update_at: string;
}

export type {
  IRepairCauseGroup,
  IRepairCauseList, IViewRequestRepairCauseList,
  IViewRequestRepairCauseListGroup
};

