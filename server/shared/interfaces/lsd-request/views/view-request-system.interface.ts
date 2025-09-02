import type { ICfgRequestSystem } from '../cfg-request-system.interface';
import type { ISection } from '../section.interface';

interface IViewRequestSystem {
  request_system_id: ICfgRequestSystem['request_system_id'];
  request_of_section_id: ICfgRequestSystem['request_of_section_id'];
  request_system_name: ICfgRequestSystem['request_system_name'];
  request_system_desc: ICfgRequestSystem['request_system_desc'];
  request_system_color: ICfgRequestSystem['request_system_color'];
  request_system_order_in_section: ICfgRequestSystem['request_system_order_in_section'];
  section_name: ISection['section_name'];
}

export type { IViewRequestSystem };
 