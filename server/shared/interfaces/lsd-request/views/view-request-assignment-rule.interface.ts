import type { ICfgRequestAssignmentRule } from '../cfg-request-assignment-rule.interface';

interface IViewRequestAssignmentRule {
  request_system_id: ICfgRequestAssignmentRule['request_system_id'];
  assignment_rule_id: ICfgRequestAssignmentRule['assignment_rule_id'];
  emp_id: ICfgRequestAssignmentRule['emp_id'];
}

export type { IViewRequestAssignmentRule };
