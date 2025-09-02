import type { IViewEmployee } from './views/view-employee.interface';

interface IEmployeePosition extends IViewEmployee {
  approver_position: number;
  approver_position_name: string;
}

export type { IEmployeePosition };
