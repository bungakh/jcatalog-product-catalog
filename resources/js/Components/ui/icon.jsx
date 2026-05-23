import React from 'react';
import { HugeiconsIcon } from '@hugeicons/react';

export function Icon({ icon, className = '', size, strokeWidth = 1.8, ...props }) {
    return (
        <HugeiconsIcon
            icon={icon}
            size={size}
            strokeWidth={strokeWidth}
            className={className}
            {...props}
        />
    );
}
