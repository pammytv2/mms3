import type { IRequestExternalRepair } from '../request-external-repair.interface';

interface IViewRequestExternalRepair extends IRequestExternalRepair {
  basic_update_by_name: string;
  quotation_update_by_name: string | null;
  received_update_by_name: string | null;
  is_calculate_parts?: boolean;
  is_calculate_service?: boolean;
}

interface IRequestExternalRepairSelected extends IViewRequestExternalRepair {
  no_have_it_sn: boolean;
}

export type { IViewRequestExternalRepair, IRequestExternalRepairSelected };
