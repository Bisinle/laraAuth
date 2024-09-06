import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { Link } from "react-router-dom";
import { useStateContext } from "../../contexts/ContextProvider";
import Pagination from "../posts/Pagination";

export default function Users() {
    const [allUsers, setAllUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [meta, setMeta] = useState(null);
    const { setNotificationOnDelete } = useStateContext();

    useEffect(() => {
        getAllUsers();
    }, []);

    const onDeleteClick = (user) => {
        // if (!window.confirm("Are you sure you want to delete this user?")) {
        //   return
        // }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            setNotificationOnDelete("User was successfully deleted");
            getAllUsers();
            // const usersUpdated = users.filter(u => u.id !== user.id)
            // setAllUsers(usersUpdated)
        });
    };


    const getAllUsers = async (page = 1) => {
        try {
            const { data } = await axiosClient.get(`/users?page=${page}`);
            setLoading(false);
            setAllUsers(data.data);
            setMeta(data.meta);
        } catch (err) {
            setLoading(false);
            setError("Failed to fetch posts");
            console.error(err);
        }
    };


  

    //^ each time the page number changes, update the ------------------------------------------------>
    //^ below function and pass the new page number to fetposts
    const onPageChange = (pageNumber) => {
        getAllUsers(pageNumber);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-100">Users</h1>
                <Link
                    to="/users/new"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded transition duration-300"
                >
                    Add new
                </Link>
            </div>
            <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
                {loading ? (
                    <div className="flex justify-center items-center h-64">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-500"></div>
                    </div>
                ) : (
                    <table className="w-full ">
                        <thead className="bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-bold bg-gray-700 text-gray-300 uppercase tracking-wider">
                                    ID
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold bg-gray-700 text-gray-300 uppercase tracking-wider">
                                    Name
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold bg-gray-700 text-gray-300 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold bg-gray-700 text-gray-300 uppercase tracking-wider">
                                    Create Date
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-bold bg-gray-700 text-gray-300 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {allUsers.map((u) => (
                                <tr
                                    key={u.id}
                                    className="hover:bg-gray-700 transition-colors duration-200"
                                >
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {u.id}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {u.name}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {u.email}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                        {new Date(
                                            u.created_at
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            to={`/users/${u.id}`}
                                            className="text-indigo-400 hover:text-indigo-300 mr-3"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => onDeleteClick(u)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
                {meta && <Pagination meta={meta} onPageChange={onPageChange} />}
        </div>
    );
}
