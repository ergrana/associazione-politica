// src/lib/trasparenza.ts
export type Income = { id: string; date: string; source: string; amount: number; note?: string };
export type Expense = { id: string; date: string; category: string; supplier: string; amount: number; note?: string };

export const INCOMES: Income[] = [
  { id: "i1", date: "2024-01-15", source: "Tesseramenti", amount: 10350 },
  // ...
];

export const EXPENSES: Expense[] = [
  { id: "e1", date: "2024-01-28", category: "Comunicazione", supplier: "Studio Media srl", amount: 8200 },
  // ...
];
