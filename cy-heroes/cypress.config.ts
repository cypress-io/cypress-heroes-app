import { defineConfig } from "cypress";

export default defineConfig({
  projectId: 'asunfc',
  experimentalStudio: true,
  e2e: {
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
