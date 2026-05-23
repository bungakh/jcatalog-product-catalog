import React from 'react';
import { CinematicFooter } from '@/Components/ui/motion-footer';

export default function Footer() {
    const appName = import.meta.env.VITE_APP_NAME || 'JCatalog';

    return <CinematicFooter appName={appName} />;
}
