import type { IRequestConcern } from '../request-concern.interface';
import type { IViewEmployee } from './view-employee.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewRequestConcern extends IViewRequest, IViewEmployee {
  request_concerner: IRequestConcern['request_concerner'];
  request_concern_comment: IRequestConcern['request_concern_comment'];
  request_concern_at: IRequestConcern['request_concern_at'];
  concern_by: IRequestConcern['concern_by'];
  concern_at: IRequestConcern['concern_at'];
}

export type { IViewRequestConcern };

