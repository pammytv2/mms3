interface ISysRequestFormType {
  request_form_type_id: 'DROPDOWN' | 'FILE' | 'NUMBER' | 'TEXT' | 'TEXTAREA';
  request_form_type_remark: string; // size : 255
}
export type { ISysRequestFormType };
