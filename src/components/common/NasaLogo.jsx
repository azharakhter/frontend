const NasaLogo = () => (
    <div className="flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-8 h-8 text-blue-400">
            <path fill="currentColor" d="M12 2L2 7l10 5l10-5l-10-5zM2 17l10 5l10-5M2 12l10 5l10-5" />
            <circle cx="12" cy="5.5" r="1.5" fill="#0ea5e9" />
            <circle cx="12" cy="12" r="1.5" fill="#0ea5e9" />
            <circle cx="12" cy="18.5" r="1.5" fill="#0ea5e9" />
        </svg>
        <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500">
            NASA Explorer
        </span>
    </div>
);

export default NasaLogo;