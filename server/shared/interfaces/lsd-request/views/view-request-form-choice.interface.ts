import type { ICfgRequestFormChoice } from '../cfg-request-form-choice.interface';
import type { ICfgRequestForm } from '../cfg-request-form.interface';
interface IViewRequestFormChoice {
  request_system_id: ICfgRequestForm['request_system_id'];
  request_form_id: ICfgRequestFormChoice['request_form_id'];
  choice_name: ICfgRequestFormChoice['choice_name'];
  choice_value: ICfgRequestFormChoice['choice_value'];
  choice_display_order: ICfgRequestFormChoice['choice_display_order'];
}

export type { IViewRequestFormChoice };
