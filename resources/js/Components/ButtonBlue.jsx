
export default function ButtonBlue({ className = '', children, ...props }) {

    return (
        <button
            {...props}
            className={`bg-blue-600 text-white rounded-md hover:shadow-sm hover:shadow-white hover:bg-blue-900 ` + className}>
            {children}
        </button>
    );
}
