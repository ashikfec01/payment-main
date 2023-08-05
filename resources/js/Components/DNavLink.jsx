import { Link } from '@inertiajs/react';

export default function DNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                ' font-medium ' +
                (active
                    ?
                    ' text-white '
                    :
                    'text-gray-400 hover:text-white ') +
                className
            }
        >
            {children}
        </Link>
    );
}
