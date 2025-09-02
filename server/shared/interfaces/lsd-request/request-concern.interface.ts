import type { IRequest } from './request.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequestConcern {
  request_id: IRequest['request_id'];
  request_concerner: IViewEmployee['ID'];
  request_concern_comment: string | null;
  request_concern_at: string;
  concern_by: IViewEmployee['ID'];
  concern_at: string;
}

export type { IRequestConcern };
