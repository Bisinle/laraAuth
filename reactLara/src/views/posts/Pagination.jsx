import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const Pagination = ({ meta, onPageChange }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const currentPage = parseInt(queryParams.get("page") || "1", 10);
    const totalPages = meta.last_page;

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const urlPage = parseInt(queryParams.get('page') || '1', 10);
      
        // If the URL page doesn't match the current data page, update the URL
        if (urlPage !== meta.current_page) {
          navigate(`?page=${meta.current_page}`, { replace: true });
        }
      
        // If the current page is greater than the last page, go to the last page
        if (meta.current_page > meta.last_page) {
          onPageChange(meta.last_page);
        }
      }, [meta, location.search, navigate, onPageChange]);
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
        <div className="flex gap-4  justify-center mt-6  rounded-sm w-auto justify-self-end p-2 ">
            <div className=" border rounded-md p-2">

            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-gray-800  text-indigo-300 font-bold  rounded-sm "
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
            >
                First
            </button>
            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-gray-800  text-indigo-300 font-bold  rounded-sm "
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
                            ? "bg-indigo-600 transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-indigo-700  text-white  rounded-sm"
                            : "transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-gray-800  text-indigo-300 font-bold  rounded-sm "
                    }
                >
                    {number}
                </button>
            ))}

            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-gray-800  text-indigo-300 font-bold  rounded-sm "
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
            >
                Next
            </button>
            <button
                className="  transition-transform duration-300 ease-in-out hover:scale-105 px-3 py-2 hover:bg-gray-800  text-indigo-300 font-bold  rounded-sm "
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
            >
                Last
            </button>
            </div>
        </div>
    );
};

export default Pagination;
