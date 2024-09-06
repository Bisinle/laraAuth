import React from "react";

export default function Pagination({ meta, onPageChange }) {
    if (!meta || !meta.links || meta.links.length <= 3) {
        return null;
    }

    const getClassName = (active) =>
        `px-3 py-1 rounded-md ${
            active
                ? "bg-blue-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-50"
        }`;

    const handleClick = (e, link) => {
        e.preventDefault();
        if (link.url) {
            // Extract page number from the URL
            const pageNumber = new URL(link.url).searchParams.get("page");
            onPageChange(Number(pageNumber));
        }
    };

    return (
        <div className="flex items-center justify-between border-t border-gray-200 bg-white px-4 py-3 sm:px-6">
            <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
                <div>
                    <p className="text-sm text-gray-700">
                        Showing <span className="font-medium">{meta.from}</span>{" "}
                        to <span className="font-medium">{meta.to}</span> of{" "}
                        <span className="font-medium">{meta.total}</span>{" "}
                        results
                    </p>
                </div>
                <div>
                    <nav
                        className="isolate inline-flex -space-x-px rounded-md shadow-sm"
                        aria-label="Pagination"
                    >
                        {meta.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={(e) => handleClick(e, link)}
                                disabled={!link.url}
                                className={getClassName(link.active)}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                            />
                        ))}
                    </nav>
                </div>
            </div>
        </div>
    );
}
