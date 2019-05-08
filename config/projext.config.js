module.exports = {
  targets: {
    app: {
      includeModules: ['wootils'],
      html: {
        template: 'index.tpl.html',
      },
      babel: {
        features: {
          decorators: true,
          classProperties: true,
        },
      },
      configuration: {
        enabled: true,
        hasFolder: false,
      },
    },
  },
};
