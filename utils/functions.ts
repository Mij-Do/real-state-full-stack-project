export function txtLength (txt: string, max:number) {
    if (txt.length > max) {
        return `${txt.slice(0, max)}...`;
    }
}