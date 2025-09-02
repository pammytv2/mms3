import type { ICfgRequestSystem } from './cfg-request-system.interface';
import type { ISysAssignmentRules } from './sys-assignment_rules.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface ICfgRequestAssignmentRule {
  request_system_id: ICfgRequestSystem['request_system_id'];
  assignment_rule_id: ISysAssignmentRules['assignment_rule_id']; // 255
  emp_id: IViewEmployee['ID']; // 10
  update_at: string;
}

export type { ICfgRequestAssignmentRule };
