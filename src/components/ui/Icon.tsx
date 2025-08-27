import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface IconProps {
    icon: IconProp;
    className?: string;
    size?: 'xs' | 'sm' | 'lg' | '1x' | '2x' | '3x';
    onClick?: () => void;
}

export default function Icon({
    icon,
    className = '',
    size = '1x',
    onClick
}: IconProps) {
    return (
        <FontAwesomeIcon
            icon={icon}
            className={className}
            size={size}
            onClick={onClick}
            style={{ cursor: onClick ? 'pointer' : 'default' }}
        />
    );
}
