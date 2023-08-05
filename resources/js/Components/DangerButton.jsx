export default function DangerButton({ className = '', disabled, children, ...props }) {
    return (
        <button
            {...props}
            className={
                `px-4 py-2 bg-red-600 rounded-sm font-semibold text-xs text-white tracking-widest hover:bg-red-500 active:bg-red-700  ${disabled && 'opacity-25'
                } ` + className
            }
            disabled={disabled}
        >
            {children}
        </button>
    );
}
