import type { IRequest } from './request.interface';

interface IRequestProcessFiles {
  request_process_file_id: string; // uuid
  request_id: IRequest['request_id'];
  request_process_file_name: string;
  request_process_file_path_name: string;
  update_by: string; // size : 255
  update_at: string;
}

export type { IRequestProcessFiles };

