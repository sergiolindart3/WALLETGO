module.exports = {
  // Esto indica a Jest que ignore los archivos CSS durante las pruebas
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy', // O puedes usar 'jest-transform-stub' si prefieres otro enfoque
  },
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest', // Si usas Babel para tus transformaciones de código
  },
  testEnvironment: "jsdom",
  //setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"],
};
