import type { IHardwareData } from '../../it-service/hardware.interface';
import type { IViewRequestExternalRepair } from './view-request-external-repair.interface';
import type { IViewRequest } from './view-request.interface';

interface IViewReportExternalRepair
  extends IViewRequest,
    IViewRequestExternalRepair {
  hardware_type_name: IHardwareData['hardware_type_name'];
}

export type { IViewReportExternalRepair };
