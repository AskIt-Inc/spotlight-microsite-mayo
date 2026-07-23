# Mayo amyloidosis clinical-trial audit

Source: the 47 studies on [Mayo Clinic's amyloidosis trial page](https://www.mayo.edu/research/clinical-trials/diseases-conditions/amyloidosis). Overall statuses below come from the [ClinicalTrials.gov v2 API](https://clinicaltrials.gov/data-api/api) field `protocolSection.statusModule.overallStatus`, using one `postFilter.ids` batch request on July 23, 2026.

## Mayo study pages with an NCT ID

| NCT ID | Overall status |
| --- | --- |
| NCT00628745 | COMPLETED |
| NCT00736749 | ACTIVE_NOT_RECRUITING |
| NCT02510261 | COMPLETED |
| NCT02939820 | APPROVED_FOR_MARKETING |
| NCT03201965 | COMPLETED |
| NCT03414632 | COMPLETED |
| NCT03458130 | COMPLETED |
| NCT03499808 | COMPLETED |
| NCT03759379 | COMPLETED |
| NCT03774784 | TERMINATED |
| NCT03997383 | COMPLETED |
| NCT04136171 | ACTIVE_NOT_RECRUITING |
| NCT04153149 | ACTIVE_NOT_RECRUITING |
| NCT04136184 | COMPLETED |
| NCT04201418 | COMPLETED |
| NCT04421040 | COMPLETED |
| NCT04504825 | ACTIVE_NOT_RECRUITING |
| NCT04512235 | ACTIVE_NOT_RECRUITING |
| NCT04561518 | **RECRUITING** |
| NCT04850105 | **RECRUITING** |
| NCT04899180 | COMPLETED |
| NCT04942067 | UNKNOWN |
| NCT04973137 | TERMINATED |
| NCT04988386 | ACTIVE_NOT_RECRUITING |
| NCT05071300 | ACTIVE_NOT_RECRUITING |
| NCT05379101 | COMPLETED |
| NCT05442047 | COMPLETED |
| NCT05598879 | **RECRUITING** |
| NCT06022939 | **RECRUITING** |
| NCT06679946 | ENROLLING_BY_INVITATION |
| NCT06788535 | COMPLETED |
| NCT06963216 | WITHDRAWN |

Mayo lists 34 pages with NCT IDs, representing 32 distinct records above: NCT06679946 and NCT06788535 each appear on two Mayo pages.

## Mayo study pages without an NCT ID

ClinicalTrials.gov cannot return `overallStatus` for these 13 Mayo-local studies because no NCT ID is published on their Mayo page:

- Health-related quality-of-life data in newly diagnosed AL amyloidosis
- Chemotherapy in immunoglobulin light (or heavy) chain amyloidosis
- Multi-organ magnetic resonance elastography in AL amyloidosis
- Imaging of systemic light-chain cardiac and whole-body amyloidosis
- Amyloidosis data and blood-sample registry
- Different heart-imaging techniques to detect amyloidosis involving the heart
- Heart-muscle stiffness magnetic-resonance elastography study
- Amyloid myopathy clinical-characteristics study
- Normal hematologic resource for aging mechanisms study
- Human heart-transplantation stress-granule cellular-preservation study
- Appointment Companion Tool
- Financial burden and quality of life in plasma-cell disorders
- Symptomatic assessment in chronic hematologic malignancies

## Microsite rule

The microsite requests the 32 NCT IDs directly from ClinicalTrials.gov in one batch and displays only records whose `overallStatus` is `RECRUITING`. The current cards are NCT04561518, NCT04850105, NCT05598879, and NCT06022939. No local trial-data fallback is used.
