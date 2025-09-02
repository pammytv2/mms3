// cfg_request_repair_cause_group
interface ICfgRequestRepairCauseGroup {
  repair_cause_group_id: 'HARDWARE' | 'SOFTWARE' | 'NETWORK' | 'EQUIPMENT';
  repair_cause_group_name: string;
  repair_cause_group_order: number;
}

export type { ICfgRequestRepairCauseGroup };
