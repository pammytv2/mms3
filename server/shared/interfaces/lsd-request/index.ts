import type { ICfgITDevSystem } from './cfg-it-dev-system.interface';
import type { ICfgRequestApprovalFlow } from './cfg-request-approval-flow.interface';
import type { ICfgRequestApprovalStatus } from './cfg-request-approval-status.interface';
import type { ICfgRequestAssignmentRule } from './cfg-request-assignment-rule.interface';
import type { ICfgRequestFEJobAction } from './cfg-request-fe-job-action.interface';
import type { ICfgRequestFEJobGroup } from './cfg-request-fe-job-group.interface';
import type { ICfgRequestFEJobType } from './cfg-request-fe-job-type.interface';
import type { ICfgRequestFormChoice } from './cfg-request-form-choice.interface';
import type { ICfgRequestForm } from './cfg-request-form.interface';
import type { ICfgRequestProcessStatus } from './cfg-request-process-status.interface';
import type { ICfgRequestProcess } from './cfg-request-process.interface';
import type { ICfgRequestRepairCauseGroup } from './cfg-request-repair-cause-group.interface';
import type { ICfgRequestRepairCauseList } from './cfg-request-repair-cause-list.interface';
import type { ICfgRequestSystem } from './cfg-request-system.interface';
import type { IEmployeePosition } from './employee.interface';
import type { IFERequestSummaryByGroup } from './fe-request-summary-by-group.interface';
import type { IFERequestSummaryBySection } from './fe-request-summary-by-section.interface';
import type { ILogExecute } from './log-execute.interface';
import type { IRepairCauseSelected } from './repair-cause.interface';
import type { IRequestApproval } from './request-approval.interface';
import type { IRequestAssignmentAssignee } from './request-assignment-assignee.interface';
import type { IRequestAssignmentConfirmation } from './request-assignment-comfirmation.interface';
import type { IRequestAssignmentData } from './request-assignment-data.interface';
import type { IRequestAssignmentFEJobAction } from './request-assignment-fe-job-action.interface';
import type { IRequestAssignmentFEJobGroup } from './request-assignment-fe-job-group.interface';
import type { IRequestAssignmentFEJobType } from './request-assignment-fe-job-type.interface';
import type { IRequestConcern } from './request-concern.interface';
import type { IRequestExternalRepair } from './request-external-repair.interface';
import type { IRequestForm } from './request-form.interface';
import type { IRequestITDevSystem } from './request-it-dev-system.interface';
import type { IRequestProcessFiles } from './request-process-files.interface';
import type { IRequestProcess } from './request-process.interface';
import type { IRequestRepairCauseList } from './request-repair-cause-list.interface';
import type { IRequestRepairCause } from './request-repair-cause.interface';
import type { IRequestState } from './request-state.interface';
import type { IRequest } from './request.interface';
import type { ISection } from './section.interface';
import type { ISysApproverPosition } from './sys-approver-position.interface';
import type { ISysAssignmentRules } from './sys-assignment_rules.interface';
import type { ISysRequestFormType } from './sys-request-form-type.interface';
import type { ISysRequestState } from './sys-request-state.interface';

interface IUserAuth {
  assignment: boolean;
  confirm_assignment: boolean;
  process: boolean;
}

export type {
  ICfgITDevSystem,
  ICfgRequestApprovalFlow,
  ICfgRequestApprovalStatus,
  ICfgRequestAssignmentRule,
  ICfgRequestFEJobAction,
  ICfgRequestFEJobGroup,
  ICfgRequestFEJobType,
  ICfgRequestForm,
  ICfgRequestFormChoice,
  ICfgRequestProcess,
  ICfgRequestProcessStatus,
  ICfgRequestRepairCauseGroup,
  ICfgRequestRepairCauseList,
  ICfgRequestSystem,
  IEmployeePosition,
  ILogExecute,
  IRepairCauseSelected,
  IRequest,
  IRequestApproval,
  IRequestAssignmentAssignee,
  IRequestAssignmentData,
  IRequestAssignmentConfirmation,
  IRequestAssignmentFEJobAction,
  IRequestAssignmentFEJobGroup,
  IRequestAssignmentFEJobType,
  IRequestConcern,
  IRequestExternalRepair,
  IRequestForm,
  IRequestITDevSystem,
  IRequestProcess,
  IRequestProcessFiles,
  IRequestRepairCause,
  IRequestRepairCauseList,
  IRequestState,
  ISection,
  ISysApproverPosition,
  ISysAssignmentRules,
  ISysRequestFormType,
  ISysRequestState,
  IUserAuth,
  IFERequestSummaryByGroup,
  IFERequestSummaryBySection,
};
