import type { IViewEmployee, IViewRequest } from '.';
import type { ICfgRequestSystem } from '..';

interface IViewReportRequestExpense extends IViewRequest {
  SECCD: IViewEmployee['SECCD'];
  section_name: IViewEmployee['section_name'];
  request_of_section_id: ICfgRequestSystem['request_of_section_id'];
}

export type { IViewReportRequestExpense };
