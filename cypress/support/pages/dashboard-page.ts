const LOCATORS={
    dashboardFragment : '/dashboard'
}

class DashboardPage{
    isLoaded(){
        cy.url().should('include',LOCATORS.dashboardFragment)
    }
}

export const dashboardPage = new DashboardPage();