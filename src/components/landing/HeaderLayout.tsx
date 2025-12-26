'use client';

import TopBanner from './TopBanner';
import Navbar from './Navbar';

export default function HeaderLayout() {
    return (
        <>
            <TopBanner />
            <Navbar bannerVisible={true} />
        </>
    );
}
