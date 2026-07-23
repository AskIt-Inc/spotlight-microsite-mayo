export interface Trial {
  id: string;
  title: string;
  status: string;
  description: string;
  phase: string;
}

// NCT IDs found on the 47 Mayo amyloidosis study pages. The API query uses this
// exact batch so unrelated Mayo studies are never shown in the microsite.
export const mayoAmyloidosisTrialIds = [
  'NCT00628745', 'NCT00736749', 'NCT02510261', 'NCT02939820',
  'NCT03201965', 'NCT03414632', 'NCT03458130', 'NCT03499808',
  'NCT03759379', 'NCT03774784', 'NCT03997383', 'NCT04136171',
  'NCT04153149',
  'NCT04136184', 'NCT04201418', 'NCT04421040', 'NCT04504825',
  'NCT04512235', 'NCT04561518', 'NCT04850105', 'NCT04899180',
  'NCT04942067', 'NCT04973137', 'NCT04988386', 'NCT05071300',
  'NCT05379101', 'NCT05442047', 'NCT05598879', 'NCT06022939',
  'NCT06679946', 'NCT06788535', 'NCT06963216',
] as const;
