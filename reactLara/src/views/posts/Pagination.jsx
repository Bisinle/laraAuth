import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ meta, onPageChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page") || "1", 10);
    const totalPages = meta.last_page;

    const renderPageNumbers = () => {
        const pageNumbers = [];
        const maxVisiblePages = 5; // Reduced to account for the "First" button

        if (totalPages <= maxVisiblePages) {
            // Show all page numbers if total pages are less than or equal to maxVisiblePages
            for (let i = 2; i <= totalPages; i++) {
                pageNumbers.push(i);
            }
        } else {
            let startPage = Math.max(2, currentPage - 1);
            let endPage = Math.min(startPage + 2, totalPages);

            // Adjust start and end page if we're near the end
            if (endPage === totalPages) {
                startPage = Math.max(2, endPage - 2);
            }

            for (let i = startPage; i <= endPage; i++) {
                pageNumbers.push(i);
            }

            // Add ellipsis if there are more pages
            if (endPage < totalPages - 1) {
                pageNumbers.push("...");
            }

            // Always add the last page if it's not already included
            if (endPage < totalPages) {
                pageNumbers.push(totalPages);
            }
        }

        return pageNumbers;
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            navigate(`?page=${page}`);
            onPageChange(page);
        }
    };

    return (
        <div className="flex gap-4  justify-end mt-6 ">
            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-gray-800 bg-gray-700 text-white  rounded-sm "
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                First
            </button>
            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-gray-800 bg-gray-700 text-white  rounded-sm "
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
            >
               Prev
            </button>

            {renderPageNumbers().map((number, index) => (
                <button
                    key={index}
                    onClick={() =>
                        typeof number === "number" && handlePageChange(number)
                    }
                    disabled={number === currentPage || number === "..."}
                    className={
                        number === currentPage
                            ? "bg-indigo-600 transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-indigo-700  text-white  rounded-sm"
                            : "transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-gray-800 bg-gray-700 text-white  rounded-sm "
                    }
                >
                    {number}
                </button>
            ))}

            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-gray-800 bg-gray-700 text-white  rounded-sm "
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 p-3 hover:bg-gray-800 bg-gray-700 text-white  rounded-sm "
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
        </div>
    );
};

export default Pagination;
