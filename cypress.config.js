import configureAllureAdapterPlugins from '@mmisty/cypress-allure-adapter/plugins';
const { defineConfig } = require("cypress");
//const allureWriter = require('@shelex/cypress-allure-plugin/writer');



module.exports = defineConfig({
  video:true,
  e2e: {
    baseUrl: 'http://localhost:8080',
    env: {
      apiUrl: 'http://localhost:3333'
    },
   // viewportWidth: 1990,
    //viewportHeight: 1100,
    setupNodeEvents(on, config) {
         configureAllureAdapterPlugins(on, config);
        // allureWriter(on, config);
          return config;
    },
  },
});
