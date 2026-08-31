import {CommandRequestType} from '../command-type/command-type.model';

export interface CommandRequest {
  targetType: CommandRequestType;
  targetId: number;
  action: string;
}

