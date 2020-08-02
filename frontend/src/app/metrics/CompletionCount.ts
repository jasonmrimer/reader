import { InterfaceName } from '../session/InterfaceName';

export class CompletionCount {
  constructor(
    public interfaceName: InterfaceName,
    public count: number
  ) {
  }
}
