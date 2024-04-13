export default class Email {
    constructor(readonly value: string) {
        if (!String(this.value).toLowerCase().match(/^[\w-]+(\.[\w-]+)*@([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}$/)) {
            throw new Error("Invalid email");
        }
    }
}
