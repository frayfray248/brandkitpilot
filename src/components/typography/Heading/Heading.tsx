import Text, { TextVariants, type TextProps } from '@/components/typography/Text/Text';

type HeadingLevel = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

const HEADING_SIZES: Record<HeadingLevel, TextVariants['size']> = {
    h1: '6xl',
    h2: '5xl',
    h3: '4xl',
    h4: '3xl',
    h5: '2xl',
    h6: 'xl',
}

type HeadingProps = Omit<TextProps, 'as' | 'size' | 'bold'> & {
    type: HeadingLevel;
    className?: string;
};

export default function Heading({ type, className, ...rest }: HeadingProps) {
    return (
        <Text
            as={type}
            size={HEADING_SIZES[type]}
            className={className}
            {...rest}
        />
    );
}