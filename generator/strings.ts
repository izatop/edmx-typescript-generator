export interface InterfaceProperty {
    name: string;
    type: string;
    optional: boolean;
}

const types = {
    'Binary': 'Buffer',
    'String': 'string',
    'Byte': 'number',
    'DateTime': 'Date',
    'DateTimeOffset': 'number',
    'Decimal': 'number',
    'Double': 'number',
    'Float': 'number',
    'Guid': 'EDM.Guid',
    'Int16': 'number',
    'Int32': 'number',
    'Int64': 'number',
    'SByte': 'number',
    'Time': 'number',
    'Stream': 'EDM.Stream'
};

function getType(type: string): string {
    if (types.hasOwnProperty(type)) {
        return types[type];
    }

    return type;
}

export const entityTypeString = (name: string, properties: InterfaceProperty[]) => `interface ${name} {
    ${properties.map(prop => `${prop.name}${prop.optional?'?':''}: ${getType(prop.type)}`).join(",\n    ")}
}`;

export const complexTypeString = (name: string, properties: InterfaceProperty[]) => `interface ${name} {
    ${properties.map(prop => `${prop.name}${prop.optional?'?':''}: ${getType(prop.type)}`).join(",\n    ")}
}`;

