export type CommonType = {
    a: number;
    b: number;
};

export const commonFunction = ({ a, b }: CommonType) => {
    return a + b;
};

export const CONSTANT_VALUE = 10;
