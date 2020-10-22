export class Converter {
    public static toGroup(parameterGroups: string[]): string {
        if (!parameterGroups || parameterGroups.length === 0) {
            return '';
        }

        return `&group=${parameterGroups.join(',')}`;
    }
}
