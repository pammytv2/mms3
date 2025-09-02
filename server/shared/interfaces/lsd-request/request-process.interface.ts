import type { ICfgRequestProcess } from './cfg-request-process.interface';
import type { ICfgRequestProcessStatus } from './cfg-request-process-status.interface';
import type { IRequest } from './request.interface';

interface IRequestProcess {
  request_process_tx_id: number;
  request_id: IRequest['request_id'];
  request_process_id: ICfgRequestProcess['request_process_id'];
  request_process_status_id: ICfgRequestProcessStatus['request_process_status_id'];
  request_process_remark: string | null; // size : 255
  request_process_notify: boolean;
  update_by: string; // size : 255
  update_at: string;
}

export type { IRequestProcess };
