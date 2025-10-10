export function cleanInput(input: string): string[] {
    return input.split(/\s+/).filter((word) => word !== "");
}