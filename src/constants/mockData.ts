export const FIRST_NAMES = [
  'John', 'Jane', 'Alice', 'Bob', 'Clara',
  'David', 'Emma', 'Frank', 'Grace', 'Henry',
] as const;

export const LAST_NAMES = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones',
  'Miller', 'Davis', 'Wilson', 'Moore', 'Taylor',
] as const;

export const PLAN_NAMES = [
  'Basic Plan',
  'Advanced Plan',
  'Enterprise Plan',
] as const;

export type PlanName = (typeof PLAN_NAMES)[number];
