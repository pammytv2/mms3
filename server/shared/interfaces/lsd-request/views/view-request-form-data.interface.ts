import type { ICfgRequestFormChoice } from '../cfg-request-form-choice.interface';
import type { ICfgRequestForm } from '../cfg-request-form.interface';
import type { IRequestForm } from '../request-form.interface';
import type { IRequest } from '../request.interface';

interface IViewRequestFormData {
  request_form_id: ICfgRequestForm['request_form_id'];
  request_system_id: ICfgRequestForm['request_system_id'];
  request_form_type_id: ICfgRequestForm['request_form_type_id'];
  form_label_text: ICfgRequestForm['form_label_text'];
  form_label_icon: ICfgRequestForm['form_label_icon'];
  form_required: ICfgRequestForm['form_required'];
  form_display_order: ICfgRequestForm['form_display_order'];
  form_number_digits: ICfgRequestForm['form_number_digits'];
  form_number_suffix: ICfgRequestForm['form_number_suffix'];
  form_grid_column: ICfgRequestForm['form_grid_column'];
  request_id: IRequest['request_id'];
  form_value: IRequestForm['form_value'];
  choice_name: ICfgRequestFormChoice['choice_name'];
  update_by: IRequestForm['update_by'];
  update_at: IRequestForm['update_at'];
  file_url?: string;
  file_type?: string;
}

export type { IViewRequestFormData };
