const permissions = {
  LIST_MEMBERS: {
    value: "LIST_MEMBERS",
    label: "List members",
  },
  INVITE_MEMBERS: {
    value: "INVITE_MEMBERS",
    label: "Invite members",
  },
  DELETE_MEMBERS: {
    value: "DELETE_MEMBERS",
    label: "Delete members",
  },
  EDIT_MEMBERS: {
    value: "EDIT_MEMBERS",
    label: "Edit members",
  },
  MODERATE_PAPERS: {
    value: "MODERATE_PAPERS",
    label: "Moderate papers",
  },
  UPLOAD_PAPERS: {
    value: "UPLOAD_PAPERS",
    label: "Upload papers",
  },
  EDIT_ACCEPT_TERMS: {
    value: "EDIT_ACCEPT_TERMS",
    label: "Edit Accept Terms",
  },
  EDIT_PRIVACY_POLICY: {
    value: "EDIT_PRIVACY_POLICY",
    label: "Edit Privacy Policy",
  },
  LIST_GROUPS: {
    value: "LIST_GROUPS",
    label: "List groups",
  },
  CREATE_GROUPS: {
    value: "CREATE_GROUPS",
    label: "Create groups",
  },
  DELETE_GROUPS: {
    value: "DELETE_GROUPS",
    label: "Delete groups",
  },
  EDIT_GROUPS: {
    value: "EDIT_GROUPS",
    label: "Edit groups",
  },
  VIEW_OPEN_DATA_DASHBOARD: {
    value: "VIEW_OPEN_DATA_DASHBOARD",
    label: "View Open Data dashboard",
  },
  VIEW_D2L_DASHBOARD: {
    value: "VIEW_D2L_DASHBOARD",
    label: "View Dental Second Look dashboard",
  },
  MODERATE_ACCESS_REQUESTS: {
    value: "MODERATE_ACCESS_REQUESTS",
    label: "Moderate access requests",
  },
  LIST_USERS: {
    value: "LIST_USERS",
    label: "List users",
  },
  DELETE_USERS: {
    value: "DELETE_USERS",
    label: "Delete users",
  },
  label: (value) => {
    return this?.[value]?.label ? this?.[value]?.label : "Not implemented";
  },
  get: () => {
    return Object.keys(this).filter((x) => x !== "label" && x !== "get");
  },
};

export default permissions;
