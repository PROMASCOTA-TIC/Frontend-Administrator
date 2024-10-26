import { ReactNode, Suspense } from 'react';

export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    );
}