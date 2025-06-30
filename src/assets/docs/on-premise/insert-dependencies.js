db.getCollection('programming_language_default_dependencies').insert({
  _id: 'javascript',
  programmingLanguage: 'JAVASCRIPT',
  defaultDependencies: {
    // lodash: '4.17.21',
    // luxon: '3.2.1',
  },
  createdAt: ISODate('2024-01-01T00:00:00.000+0000'),
  createdBy: {
    _id: 'YC-Default-Dependencies',
    name: 'YC-Default-Dependencies'
  }
});

db.getCollection('programming_language_default_dependencies').insert({
  _id: 'python',
  programmingLanguage: 'PYTHON',
  defaultDependencies: {
    // pandas: '2.2.0',
    // requests: '2.31.0'
  },
  createdAt: ISODate('2024-01-01T00:00:00.000+0000'),
  createdBy: {
    _id: 'YC-Default-Dependencies',
    name: 'YC-Default-Dependencies'
  }
});
