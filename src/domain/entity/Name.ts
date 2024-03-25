export default class Name {
    private value: string;
    constructor(private readonly name: string) {
        if (name.trim().length == 0) throw new Error("Invalid name. Must send name and surname");
        this.value = this.name;
    }

    getValue(): string { return this.value; }
}