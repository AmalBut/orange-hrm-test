import { WebElementHandler } from "./web-element-handler";

const LOCATORS = {
  USER_SETTING_DROP_DOWN: ".oxd-userdropdown",
  USER_DROP_DOWN_LINK: ".oxd-userdropdown-link",
  DATE_ICON: ".oxd-date-input-icon",
  CALENDAR_WRAPPER: ".oxd-calendar-wrapper",
  CALENDAR_DATE: ".oxd-calendar-date",
  CALENDAR_DATE_WRAPPER: ".oxd-calendar-date-wrapper",
  NEXT_MONTH_BUTTON: ".oxd-icon.bi-chevron-right",
  NON_WORKING_DAY_CLASS: ".--non-working-day",
  TODAY_CLASS: ".--today",
  DATE_INPUT: ".oxd-date-input",
  DATE_INPUT_FIELD: ".oxd-input",
  HOLIDAY_FULL_CLASS: ".--holiday-full",
};

export class CommonHelper {
  private static usedIds = new Set<string>();
  waitFor(seconds: number) {
    cy.wait(seconds);
  }

  getUniqueId(): string {
    let id: string;
    do {
      id = Math.floor(10000 + Math.random() * 90000).toString();
    } while (CommonHelper.usedIds.has(id));
    CommonHelper.usedIds.add(id);
    return id;
  }

  getRandomString(): string {
    return Math.random().toString(36).substring(2, 8);
  }

  visitBaseUrl() {
    cy.visit("/");
  }

  logout() {
    cy.get(LOCATORS.USER_SETTING_DROP_DOWN).click();
    cy.contains(LOCATORS.USER_DROP_DOWN_LINK, "Logout").click();
  }

  clickOnDropDownList(listName: string) {
    WebElementHandler.getDropDownList(listName).click();
  }
  selectDropDownOption(option: any) {
    WebElementHandler.getDropDownOptions().contains(option).click();
  }

  selectDropDownOptionByIndex(index: number) {
    WebElementHandler.getDropDownOptions().eq(index).click();
  }

  clickOnSearchButton() {
    WebElementHandler.getSearchButton().click();
  }

  selectFutureDate(): Cypress.Chainable<string> {
    cy.get(LOCATORS.DATE_ICON).first().click();

    return cy.get(LOCATORS.CALENDAR_WRAPPER).then(($calendar) => {
      const $dates = $calendar.find(LOCATORS.CALENDAR_DATE);
      const $next = this.getNextWorkingDay($dates);

      if ($next) {
        cy.wrap($next).click();
      } else {
        cy.wrap($calendar).find(LOCATORS.NEXT_MONTH_BUTTON).click();

        cy.get(LOCATORS.CALENDAR_WRAPPER)
          .find(LOCATORS.CALENDAR_DATE_WRAPPER)
          .each(($wrapper) => {
            const isNonWorking = $wrapper.hasClass(
              LOCATORS.NON_WORKING_DAY_CLASS
            );
            const isHoliday = $wrapper.find(LOCATORS.CALENDAR_DATE).hasClass(LOCATORS.HOLIDAY_FULL_CLASS);
            if (!isNonWorking && !isHoliday) {
              cy.wrap($wrapper).find(LOCATORS.CALENDAR_DATE).click();
              return false;
            }
          });
      }

      return cy.get(".oxd-date-input .oxd-input").first().invoke("val");
    });
  }

  getNextWorkingDay($dates: JQuery<HTMLElement>) {
    const todayIndex = $dates.index($dates.filter(LOCATORS.TODAY_CLASS));

    for (let i = todayIndex + 1; i < $dates.length; i++) {
      const $wrapper = $dates.eq(i).parent();
      const isNonWorking = $wrapper.hasClass(LOCATORS.NON_WORKING_DAY_CLASS);
      const isHoliday = $wrapper.find(LOCATORS.CALENDAR_DATE).hasClass(LOCATORS.HOLIDAY_FULL_CLASS);
      if (!isNonWorking && !isHoliday) {
        return $dates.eq(i);
      }
    }

    return null;
  }
}

export const commonHelper = new CommonHelper();
