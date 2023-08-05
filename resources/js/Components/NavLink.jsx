import { Link } from '@inertiajs/react';

export default function NavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={
                ' px-1 pt-1 font-medium ' +
                (active
                    ?
                    ' text-blue-500 '
                    :
                    'text-white hover:text-blue-500 ') +
                className
            }
        >
            {children}
        </Link>
    );
}
