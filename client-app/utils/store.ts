import { atom } from "recoil";

export const requestState = atom({
  key: "requestState", // unique ID (with respect to other atoms/selectors)
  default: {
      requestName: "",
      requestTime: 0,
      requestSize: 0,
      requestNestingLevel: 0
  }, // default value (aka initial value)
});
