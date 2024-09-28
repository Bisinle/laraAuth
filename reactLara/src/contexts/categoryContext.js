import { useState, useEffect } from "react";
import axiosClient from "../axiosClient";

const categoryContext = () => {
    const [categories, setCategories] = useState([]);
    const [categoryLoading, setCategoryLoading] = useState(true);
    const [categoryError, setCategoryError] = useState(null);

    useEffect(() => {
        fetchCategories();
    }, []);

    //^ fetch categories function ------------------------------------------------------------------------->
    const fetchCategories = async () => {
        try {
            setCategoryLoading(true);
            const { data } = await axiosClient.get(`/categories`);
            setCategoryLoading(false);
            setCategories(data.data);
        } catch (err) {
            setCategoryLoading(false);
            setCategoryError("Failed to fetch posts");
        }
    };

    return { categories, categoryLoading, categoryError };
};

export default categoryContext;
