import { returnKey } from "./constants";

export type Return = { returnKey: typeof returnKey };

const returnVal = <T extends object>(value: T): T & Return => {
  const returnMarker: Return = { returnKey };
  return Object.assign(value, returnMarker);
}

returnVal(Promise.resolve());

export default returnVal;
