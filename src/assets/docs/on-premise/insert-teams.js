db.getCollection("teams").insert({
  _id: "yepcode-on-prem",
  name: "yepcode-on-prem",
  state: {
    dailyConsumption: {
      start: ISODate("2024-01-01T00:00:00.000+0000"),
      end: ISODate("2024-01-01T00:00:00.000+0000"),
      consumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0M0.0S",
      },
    },
    outOfYeps: false,
    numOfUsedForms: NumberInt(0),
    lastActiveAt: ISODate("2024-01-01T00:00:00.000+0000"),
    lastContentEditionAt: ISODate("2024-01-01T00:00:00.000+0000"),
    schedulesCount: {
      numOfPendingDateTimes: NumberInt(0),
      numOfActiveCrons: NumberInt(24),
    },
  },
  settings: {
    executionSettings: {},
    disabledExecutions: false,
    executorSettings: {
      engine: "NODE_SECURED",
      customPools: [],
    },
  },
  billingPlan: {
    type: "ENTERPRISE",
    limits: {
      maxProcesses: NumberInt(0),
      maxCredentials: NumberInt(0),
      maxForms: NumberInt(0),
      maxTeamMembers: NumberInt(0),
      maxTimePerExecutionInMillis: NumberLong(18000000),
      maxReturnSizeInBytes: NumberInt(0),
      maxLogEntries: NumberInt(0),
      maxLogEntriesSizeInBytes: NumberInt(0),
      maxConcurrentExecutions: NumberInt(0),
      datastore: {
        maxEntries: NumberInt(0),
        maxEntrySizeInBytes: NumberLong(0),
      },
      parameters: {
        maxSizeInBytes: NumberLong(0),
        maxFilesSizeInBytes: NumberLong(0),
      },
      unlimitedExecutions: true,
      dailyConsumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0S",
      },
      monthlyConsumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0S",
      },
      rateLimits: [],
    },
    enabledFeatures: ["AUDIT", "DISABLED_FORM_BRANDING", "FILE_PARAMETERS"],
    monthlyYeps: NumberInt(0),
  },
  stats: {
    start: ISODate("2024-01-01T00:00:00.000+0000"),
    end: ISODate("2024-01-01T00:00:00.000+0000"),
    executionsCount: NumberInt(0),
    executionsTotalTime: "PT0H0M0.000S",
  },
  version: NumberLong(1),
  zoneId: "Europe/Madrid",
  createdBy: {
    _id: "9ba926be-5bc6-45a2-9b89-942d493e7614",
    name: "admin@yepcode.io",
  },
  updatedBy: {
    _id: "9ba926be-5bc6-45a2-9b89-942d493e7614",
    name: "admin@yepcode.io",
  },
  createdAt: ISODate("2024-01-01T00:00:00.000+0000"),
  updatedAt: ISODate("2024-01-01T00:00:00.000+0000"),
  _class: "com.trileuco.yepcode.infrastructure.repository.team.TeamDocument",
});

db.getCollection("teams").insert({
  _id: "sandbox",
  name: "sandbox",
  state: {
    dailyConsumption: {
      start: ISODate("2024-01-01T00:00:00.000+0000"),
      end: ISODate("2024-01-01T00:00:00.000+0000"),
      consumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0M0.0S",
      },
    },
    outOfYeps: false,
    numOfUsedForms: NumberInt(0),
    lastActiveAt: ISODate("2024-01-01T00:00:00.000+0000"),
    lastContentEditionAt: ISODate("2024-01-01T00:00:00.000+0000"),
    schedulesCount: {
      numOfPendingDateTimes: NumberInt(0),
      numOfActiveCrons: NumberInt(24),
    },
  },
  settings: {
    executionSettings: {},
    disabledExecutions: false,
    executorSettings: {
      engine: "NODE_SECURED",
      customPools: [],
    },
  },
  billingPlan: {
    type: "ENTERPRISE",
    limits: {
      maxProcesses: NumberInt(0),
      maxCredentials: NumberInt(0),
      maxForms: NumberInt(0),
      maxTeamMembers: NumberInt(0),
      maxTimePerExecutionInMillis: NumberLong(18000000),
      maxReturnSizeInBytes: NumberInt(0),
      maxLogEntries: NumberInt(0),
      maxLogEntriesSizeInBytes: NumberInt(0),
      maxConcurrentExecutions: NumberInt(0),
      datastore: {
        maxEntries: NumberInt(0),
        maxEntrySizeInBytes: NumberLong(0),
      },
      parameters: {
        maxSizeInBytes: NumberLong(0),
        maxFilesSizeInBytes: NumberLong(0),
      },
      unlimitedExecutions: true,
      dailyConsumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0S",
      },
      monthlyConsumption: {
        executionsCount: NumberInt(0),
        executionsTotalTime: "PT0S",
      },
      rateLimits: [],
    },
    enabledFeatures: ["AUDIT", "DISABLED_FORM_BRANDING", "FILE_PARAMETERS"],
    monthlyYeps: NumberInt(0),
  },
  stats: {
    start: ISODate("2024-01-01T00:00:00.000+0000"),
    end: ISODate("2024-01-01T00:00:00.000+0000"),
    executionsCount: NumberInt(0),
    executionsTotalTime: "PT0H0M0.000S",
  },
  version: NumberLong(1),
  zoneId: "Europe/Madrid",
  createdBy: {
    _id: "9ba926be-5bc6-45a2-9b89-942d493e7614",
    name: "admin@yepcode.io",
  },
  updatedBy: {
    _id: "9ba926be-5bc6-45a2-9b89-942d493e7614",
    name: "admin@yepcode.io",
  },
  createdAt: ISODate("2024-01-01T00:00:00.000+0000"),
  updatedAt: ISODate("2024-01-01T00:00:00.000+0000"),
  _class: "com.trileuco.yepcode.infrastructure.repository.team.TeamDocument",
});
