module.exports = {
  presets: ['module:metro-react-native-babel-preset'], // existing
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.tsx', '.ts', '.js', '.json'],
        root: ['.'],
        alias: {
          '@Util': './src/Util',
          '@src': './src',
          // '@CommonComponent': './src/CommonComponent',
          // '@Validator': './src/Util/Validator',
        },
      },
    ],
    'react-native-reanimated/plugin', // PUT IT HERE
  ],
};
