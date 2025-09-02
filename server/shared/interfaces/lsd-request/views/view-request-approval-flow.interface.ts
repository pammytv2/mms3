import type { ICfgRequestApprovalFlow } from '../cfg-request-approval-flow.interface';
import type { ICfgRequestSystem } from '../cfg-request-system.interface';
import type { ISysApproverPosition } from '../sys-approver-position.interface';

interface IViewRequestApprovalFlow {
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_of_section_id: ICfgRequestSystem['request_of_section_id'];
  request_system_name: ICfgRequestSystem['request_system_name'];
  approver_level: ICfgRequestApprovalFlow['approver_level'];
  approver_position: ICfgRequestApprovalFlow['approver_position'];
  approver_position_name: ISysApproverPosition['approver_position_name'];
  approver_position_code: ISysApproverPosition['approver_position_code'];
}

export type { IViewRequestApprovalFlow };
