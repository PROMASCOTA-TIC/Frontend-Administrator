import { ReactNode } from 'react';

export default function MarginWidthWrapper({
    children,
}: {
    children: ReactNode;
}) {
    return (
        <div>
            {children}
        </div>
    );
}