export class CommonHelper{
    private static usedIds = new Set<string>();
    waitFor(seconds : number){
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

    visitBaseUrl(){
        cy.visit("/");
    }

}

export const commonHelper = new CommonHelper();