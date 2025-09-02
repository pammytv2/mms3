import type { ICfgRequestForm } from './cfg-request-form.interface';
import type { IRequest } from './request.interface';
import type { IViewEmployee } from './views/view-employee.interface';

interface IRequestForm {
  request_form_value_id: number;
  request_id: IRequest['request_id'];
  request_form_id: ICfgRequestForm['request_form_id'];
  form_value: any;
  update_by?: IViewEmployee['ID'];
  update_at?: string;
}

export type { IRequestForm };

