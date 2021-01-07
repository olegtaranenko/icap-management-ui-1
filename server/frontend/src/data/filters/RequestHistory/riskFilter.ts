import { Risk } from "../../../../../src/common/models/enums/Risk";

const riskFilter = [
  {
    id: "risk",
    filterName: "Risk",
    checkboxList: [
      {
        id: "risk-blocked-by-policy",
        name: "docType",
        format: "Blocked By Policy",
        titleColor: "#e6cd70",
        isChecked: false,
        type: "checkbox",
        riskEnum: Risk["Blocked by Policy"]
      },
      {
        id: "risk-allowed-by-policy",
        name: "docType",
        format: "Allowed By Policy",
        titleColor: "#86c2cc",
        isChecked: false,
        type: "checkbox",
        riskEnum: Risk["Allowed by Policy"]
      },
      {
        id: "risk-blocked-by-ncfs",
        name: "docType",
        format: "Blocked By NCFS",
        titleColor: "#d47779",
        isChecked: false,
        type: "checkbox",
        riskEnum: Risk["Blocked by NCFS"]
      },
      {
        id: "risk-allowed-by-ncfs",
        name: "docType",
        format: "Allowed By NCFS",
        titleColor: "#84b5d6",
        isChecked: false,
        type: "checkbox",
        riskEnum: Risk["Allowed by NCFS"]
      },
      {
        id: "risk-safe",
        name: "docType",
        format: "Safe",
        titleColor: "#8fcba9",
        isChecked: false,
        type: "checkbox",
        riskEnum: Risk.Safe
      }
    ]
  }
]

export default riskFilter;