export class CommonHelper{
    private static usedEmployeeIds = new Set<string>();
    waitFor(seconds : number){
        cy.wait(seconds);
    }

    getUniqueEmployeeId(): string {
        let id: string;
        do {
            id = Math.floor(10000 + Math.random() * 90000).toString();
        } while (CommonHelper.usedEmployeeIds.has(id));
        CommonHelper.usedEmployeeIds.add(id);
        return id;
    }

}

export const commonHelper = new CommonHelper();