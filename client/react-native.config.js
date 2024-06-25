module.exports = {
  dependencies: {
      'react-native-vector-icons': {
          platforms: {
              ios: null, // This will prevent the library from being linked automatically for iOS
          },
      },
  },
  assets: ['./src/assets/fonts'],  
};
