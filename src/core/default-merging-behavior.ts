import type { MergingBehavior } from "../types";

let mergingBehavior: MergingBehavior = "submissive";

export const getDefaultMergingBehavior = () => mergingBehavior;
export const setDefaultMergingBehavior = (newMergingBehavior: MergingBehavior) => {
  mergingBehavior = newMergingBehavior;
};
