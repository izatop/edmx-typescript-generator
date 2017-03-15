export interface InterfaceProperty {
    name: string;
    type: string;
    optional: boolean;
}
export declare const helpers: () => string;
export declare const entityTypeString: (name: string, base: string, properties: InterfaceProperty[], namespace: string) => string;
export declare const complexTypeString: (name: string, properties: InterfaceProperty[], namespace: string) => string;
