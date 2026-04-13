export const mockGroups = [
  { name: 'Admin', color: 'red', memberCount: 3 },
  { name: 'Developer', color: 'blue', memberCount: 12 },
  { name: 'Client', color: 'purple', memberCount: 8 },
  { name: 'QA', color: 'orange', memberCount: 5 },
  { name: 'DevOps', color: 'cyan', memberCount: 4 },
];

export const mockFolderStructure = {
  trunk: {
    src: {
      components: null,
      utils: null,
      api: null,
    },
    docs: null,
    tests: null,
  },
  branches: {
    'feature-auth': {
      src: null,
    },
    'feature-payment': {
      src: null,
    },
  },
  tags: {
    'release-1.0': null,
    'release-1.1': null,
  },
  confidential: {
    hr: null,
    finance: null,
  },
  shared: {
    'public-assets': null,
    libraries: null,
  },
};

export const mockPermissions = {
  '/trunk': {
    Admin: 'Write',
    Developer: 'Write',
    Client: 'Deny',
    QA: 'Read',
    DevOps: 'Write',
  },
  '/trunk/src': {
    Admin: 'Write',
    Developer: 'Write',
    Client: 'Deny',
    QA: 'Read',
    DevOps: 'Write',
  },
  '/trunk/docs': {
    Admin: 'Write',
    Developer: 'Write',
    Client: 'Read',
    QA: 'Read',
    DevOps: 'Write',
  },
  '/branches': {
    Admin: 'Write',
    Developer: 'Write',
    Client: 'Deny',
    QA: 'Read',
    DevOps: 'Write',
  },
  '/confidential': {
    Admin: 'Write',
    Developer: 'Deny',
    Client: 'Deny',
    QA: 'Deny',
    DevOps: 'Read',
  },
  '/shared': {
    Admin: 'Write',
    Developer: 'Read',
    Client: 'Read',
    QA: 'Read',
    DevOps: 'Write',
  },
};