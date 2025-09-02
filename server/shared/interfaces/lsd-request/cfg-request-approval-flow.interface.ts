import type { ICfgRequestSystem } from './cfg-request-system.interface';
import type { ISysApproverPosition } from './sys-approver-position.interface';

interface ICfgRequestApprovalFlow {
  request_system_id: ICfgRequestSystem['request_system_id'];
  approver_position: ISysApproverPosition['approver_position'];
  approver_level: number;
  update_at: string;
}

export type { ICfgRequestApprovalFlow };
