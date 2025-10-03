export class CommonHelper{
    private static usedIds = new Set<string>();
    waitFor(seconds : number){
        cy.wait(seconds);
    }

    getUniqueId(): string {
        let id: string;
        do {
            id = Math.floor(10000 + Math.random() * 900000).toString();
        } while (CommonHelper.usedIds.has(id));
        CommonHelper.usedIds.add(id);
        return id;
    }

}

export const commonHelper = new CommonHelper();