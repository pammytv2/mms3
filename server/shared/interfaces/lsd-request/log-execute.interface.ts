import type { IViewEmployee } from './views/view-employee.interface';

interface ILogExecute {
  TxID: number;
  SQL_Query?: string;
  Execute_By?: IViewEmployee['ID'];
  Execute_At: string;
}

export type { ILogExecute };

