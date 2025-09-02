interface ICfgRequestSystem {
  request_system_id: number;
  request_of_section_id: number;
  request_system_name: string; // size : 255
  update_at: string;
  request_system_enabled: 0 | 1;
  request_system_desc: string; // size : 255
  request_system_color: string; // size : 255
  request_system_order_in_section: number; // size : 255
}

export type { ICfgRequestSystem };
