import { Injection } from "./Injection";

export class Injections {
    listInjections(): Injection[] {
        const arr = JSON.parse(localStorage.getItem('Injection:list'));
        console.log('arr is:', arr);
        return <Injection[]>(Array.isArray(arr) ? arr : []);
    }

    setInjections(assets: Injection[]) {
        localStorage.setItem('Injection:list', JSON.stringify(assets));
    }

    getInjection(name: string) {
        return this.listInjections().find(x => x.name === name);
    }

    addInjection(injection: Injection) {
        let injections = this.listInjections();
        if (injections.find(x => x.name === injection.name)) {
            throw new Error(`Injections: Injection exists! ('${injection.name}')`);
        }
        injections = [...injections, injection].sort((a, b) => (a.name === b.name ? 0 : (a < b ? -1 : 1)));
        this.setInjections(injections);
    }
}
