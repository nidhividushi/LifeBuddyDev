module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          '@': './src',
          '@components': './src/components',
          '@screens': './src/screens',
          '@contexts': './src/contexts',
          '@utils': './src/utils',
          '@types': './src/types',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
}; 