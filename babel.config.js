module.exports = {
  presets: [
    [
      '@vue/app',
      {
        useBuiltIns: 'entry',
        jsx: {
          injectH: false,
        },
      },
    ],
    '@vue/babel-preset-jsx',
  ],
  plugins: [
    [
      'import',
      { libraryName: 'ant-design-vue', libraryDirectory: 'es', style: true },
    ],
  ],
}
