import type { ICfgITDevSystem } from './cfg-it-dev-system.interface';
import type { IRequest } from './request.interface';

interface IRequestITDevSystem {
  request_id: IRequest['request_id'];
  it_dev_system_id: ICfgITDevSystem['it_dev_system_id'];
  update_by?: string;
  update_at?: string;
}

export type { IRequestITDevSystem };
