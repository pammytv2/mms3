import type { ICfgRequestProcess } from '../cfg-request-process.interface';
import type { ICfgRequestProcessStatus } from '../cfg-request-process-status.interface';
import type { IRequestProcess } from '../request-process.interface';
import type { IViewEmployee } from './view-employee.interface';
interface IViewRequestProcessHistory {
  request_process_id: IRequestProcess['request_process_id'];
  request_id: IRequestProcess['request_id'];
  request_process_remark: IRequestProcess['request_process_remark'];
  request_process_notify: IRequestProcess['request_process_notify'];
  update_at: IRequestProcess['update_at'];

  request_process_name: ICfgRequestProcess['request_process_name'];
  request_process_color: ICfgRequestProcess['request_process_color'];

  request_process_status_name: ICfgRequestProcessStatus['request_process_status_name'];
  request_process_status_color: ICfgRequestProcessStatus['request_process_status_color'];

  eng_name: IViewEmployee['eng_name'];
  position_name: IViewEmployee['position_name'];
}

export type { IViewRequestProcessHistory };
