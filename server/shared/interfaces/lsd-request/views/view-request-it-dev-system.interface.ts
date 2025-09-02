import type { ICfgITDevSystem } from '../cfg-it-dev-system.interface';
import type { IRequestITDevSystem } from '../request-it-dev-system.interface';
import type { IViewEmployee } from './view-employee.interface';

interface IViewRequestITDevSystem {
  request_id: IRequestITDevSystem['request_id'];
  it_dev_system_id: ICfgITDevSystem['it_dev_system_id'];
  it_dev_system_name: ICfgITDevSystem['it_dev_system_name'];
  update_by: IRequestITDevSystem['update_by'];
  update_by_name: IViewEmployee['eng_name'];
  update_at: IRequestITDevSystem['update_at'];
}

export type { IViewRequestITDevSystem };
