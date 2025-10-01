import { loginPage } from "./pages/login-page";

declare global {
  namespace Cypress {
    interface Chainable {
      loginToOrangehrm(username: string, password: string): Chainable<void>;
    }
  }
}

Cypress.Commands.add("loginToOrangehrm", (username: string, password: string) => {
  loginPage.isLoaded();
  loginPage.typeUsername(username);
  loginPage.typePassword(password);
  loginPage.submit();
});

