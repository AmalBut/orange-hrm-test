const LOCATORS={
    DASHBOARD_FRAGMENT : '/dashboard'
}

class DashboardPage{
    isLoaded(){
        cy.url().should('include',LOCATORS.DASHBOARD_FRAGMENT)
    }
}

export const dashboardPage = new DashboardPage();