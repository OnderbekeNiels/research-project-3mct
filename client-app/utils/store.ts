import { atom } from "recoil";

export const requestState = atom({
  key: "requestState", // unique ID (with respect to other atoms/selectors)
  default: {
    requestName: "",
    responseTime: 0,
    responseSize: 0,
    requestNestingLevel: 0,
    description: "...",
  }, // default value (aka initial value)
});
