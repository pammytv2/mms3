import type { ICfgRequestForm } from './cfg-request-form.interface';

interface ICfgRequestFormChoice {
  request_form_choice_id: number;
  request_form_id: ICfgRequestForm['request_form_id'];
  choice_name: string;
  choice_value: string;
  choice_display_order: number;
}
export type { ICfgRequestFormChoice };
