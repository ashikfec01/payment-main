
export default function ButtonPink({ className = '', children }) {

    return (
        <button className={`bg-[#fc7095] text-white hover:shadow-sm hover:shadow-slate-900 hover:bg-[#f84c7a] ` + className}>
            {
                children
            }
        </button>
    );
}
