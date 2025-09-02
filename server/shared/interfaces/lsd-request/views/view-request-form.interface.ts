import type { ICfgRequestForm } from '../cfg-request-form.interface';
import type { IRequestForm } from '../request-form.interface';

interface IViewRequestForm {
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
  form_max: ICfgRequestForm['form_max'];
  form_remark: ICfgRequestForm['form_remark'];
  form_value: IRequestForm['form_value'];
}
export type { IViewRequestForm };
