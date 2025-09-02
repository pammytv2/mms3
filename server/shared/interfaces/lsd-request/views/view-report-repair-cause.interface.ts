import type { IViewRequestRepairCauseList } from './view-request-repair-cause-list.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportRepairCause
  extends IViewRequest,
    IViewRequestRepairCauseList {}

export type { IViewReportRepairCause };

