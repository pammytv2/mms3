import type { IHardwareData } from '../it-service/hardware.interface';
import type { IRequest } from './request.interface';

interface IRequestExternalRepair {
  external_repair_id: string; // Pk
  request_id: IRequest['request_id'];
  hardware_it_sn: IHardwareData['hardware_it_sn'];
  vendor: string;
  repair_date: string;
  basic_update_by: string;
  basic_update_at: string;
  quotation_no: string | null;
  quotation_date: string | null;
  parts_cost: number | null;
  service_cost: number | null;
  charge_cost: string | null;
  repair_detail: string | null;
  quotation_update_by: string | null;
  quotation_update_at: string | null;
  received_date: string | null;
  invoice_no: string | null;
  received_update_by: string | null;
  received_update_at: string | null;
}


export type { IRequestExternalRepair };
