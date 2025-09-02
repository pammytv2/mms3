import type { IRequest } from './request.interface';

// tb_request_repair_cause
interface IRequestRepairCause {
  repair_cause_id: string;
  request_id: IRequest['request_id'];
  hardware_it_sn: string | null;
  repair_cause_remark: string | null;
  update_by?: string;
  update_at?: string;
  computer_id: number;
}
export type { IRequestRepairCause };
