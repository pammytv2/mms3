import type { ICfgRequestSystem } from './cfg-request-system.interface';

interface ICfgRequestProcess {
  request_process_id: number;
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_process_name: string; // size : 255
  request_process_color: string; // size : 255
  request_process_level: number;
}

export type { ICfgRequestProcess };
