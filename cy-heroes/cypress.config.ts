import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'asunfc',
  experimentalStudio: true,
  e2e: {
    retries: {
       runMode: 3
    },
    baseUrl: 'http://localhost:4200',
  },

  component: {
    devServer: {
      framework: 'angular',
      bundler: 'webpack',
    },
    specPattern: '**/*.cy.ts',
  },
});
