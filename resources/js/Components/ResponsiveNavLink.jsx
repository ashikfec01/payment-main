import { Link } from '@inertiajs/react';

export default function ResponsiveNavLink({ active = false, className = '', children, ...props }) {
    return (
        <Link
            {...props}
            className={`w-full flex items-start py-2 ${active
                ? ' text-blue-500  '
                : ' text-white hover:text-blue-500 '
                } font-medium hover:bg-slate-800 focus:outline-none transition duration-150 ease-in-out ${className}`}
        >
            {children}
        </Link>
    );
}
