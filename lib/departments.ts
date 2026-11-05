/**
 * Die acht Abteilungen auf dem Baum. Reihenfolge = Reihenfolge im Canvas,
 * in den Tabs und im Abteilungs-Rad. Namen kommen aus den Wörterbüchern
 * (messages/*), hier stehen nur Farbe und Icon.
 */
export const DEPARTMENTS = [
  // teams = Anzahl Skills pro Team (Fächer im Baum; passt zu den Wörterbüchern)
  { id: "sales", color: "#F5A524", rgb: [245, 165, 36], icon: "Target", teams: [4, 5, 4, 3] },
  { id: "marketing", color: "#F472B6", rgb: [244, 114, 182], icon: "Megaphone", teams: [5, 4, 3, 2] },
  { id: "service", color: "#60A5FA", rgb: [96, 165, 250], icon: "Headphones", teams: [5, 4, 3, 2] },
  { id: "operations", color: "#34D399", rgb: [52, 211, 153], icon: "Workflow", teams: [4, 4, 3, 4] },
  { id: "finance", color: "#A4E63A", rgb: [164, 230, 58], icon: "Wallet", teams: [4, 3, 4, 2] },
  { id: "admin", color: "#A78BFA", rgb: [167, 139, 250], icon: "FileText", teams: [4, 3, 3, 2] },
  { id: "people", color: "#FB7185", rgb: [251, 113, 133], icon: "Users", teams: [3, 3, 2, 2] },
  { id: "insights", color: "#2DD4BF", rgb: [45, 212, 191], icon: "TrendingUp", teams: [3, 3, 3, 2] },
] as const;

export type DeptId = (typeof DEPARTMENTS)[number]["id"];

export const deptIndex = (id: DeptId) =>
  DEPARTMENTS.findIndex((d) => d.id === id);
