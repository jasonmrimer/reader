import { InterfaceName } from './InterfaceName';
import { PassageName } from './PassageName';

export class SessionPair {
  constructor(
    public interfaceName: InterfaceName,
    public passageName: PassageName
  ) {
  }
}
