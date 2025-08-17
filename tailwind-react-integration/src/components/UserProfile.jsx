function UserProfile() {
    return (
        <div className="user-profile bg-gray-100 sm:p-4 md:p-8 sm:max-w-xs md:max-w-sm mx-auto my-20 rounded-lg shadow-lg w-36 h-36 sm:h-24 md:h-36">
            <img className="rounded-full w-36 h-36 mx-auto sm:h-24 md:h-36" src="https://via.placeholder.com/150" alt="User" />
            <h1 className="text-xl sm:text-sm md:text-base text-blue-800 my-4">John Doe</h1>
            <p className="text-gray-600 text-lg sm:text-sm md:text-xl">Developer at Example Co. Loves to write code and explore new technologies.</p>
        </div>
    );
}

export default UserProfile;