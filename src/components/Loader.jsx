const Loader = () => {
    return (
        <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            <span className="sr-only">Loading...</span>
        </div>
    );
};

export default Loader;