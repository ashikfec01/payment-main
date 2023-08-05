
export default function ButtonBlueOutline({ className, children, ...props }) {

    return (
        <button
            {...props}
            className={'border-2 border-blue-500 text-blue-500  hover:border-pink-500 hover:text-pink-500 ' + className}>
            {children}
        </button>
    );

}
