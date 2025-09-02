import type { ICfgRequestSystem } from './cfg-request-system.interface';
import type { ISysRequestFormType } from './sys-request-form-type.interface';

interface ICfgRequestForm {
  request_form_id: number;
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_form_type_id: ISysRequestFormType['request_form_type_id'];
  form_label_text: string;
  form_label_icon: string;
  form_required: 0 | 1;
  form_display_order: number;
  form_number_digits: number;
  form_number_suffix: string;
  form_grid_column: number;
  form_max: number;
  form_remark: string;
}
export type { ICfgRequestForm };
