
interface TruncatedStringProps {
    str: string;
    maxLength?: number; // Make maxLength optional
}

export const truncateString = ({ str, maxLength = 10 }: TruncatedStringProps): string => {
    if (str.length <= maxLength) return str;

    const start = str.slice(0, Math.ceil(maxLength / 2));
    const end = str.slice(-Math.floor(maxLength / 2));

    return `${start}...${end}`;
};
;
