/* tslint:disable */
/* eslint-disable */
// This file was automatically generated and should not be edited.

import { GemColor } from "./globalTypes";

// ====================================================
// GraphQL fragment: CardSelection
// ====================================================

export interface CardSelection_cost {
  __typename: "CostUnit";
  gemColor: GemColor;
  quantity: number;
}

export interface CardSelection {
  __typename: "Card";
  id: string;
  gemColor: GemColor | null;
  pointValue: number;
  cost: CardSelection_cost[];
}
