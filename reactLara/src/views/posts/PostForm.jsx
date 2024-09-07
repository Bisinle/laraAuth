import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axiosClient";
import { useStateContext } from "../../contexts/ContextProvider";
import categoryContext from "../../contexts/categoryContext";

export default function PostForm() {
    const navigate = useNavigate();
    let { id } = useParams();
    console.log(id);

    const [post, setPost] = useState({
        id: null,
        title: "",
        description: "",
        category_id: "",
        user_id: "",
    });
    const [errors, setErrors] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setNotificationOnDelete } = useStateContext();
    const { categories, categoryError, categoryLoading } = categoryContext();
    console.log(categories);

    if (id) {
        useEffect(() => {
            console.log(id);

            //   setLoading(true)
            //   axiosClient.get(`/post/${id}`)
            //     .then(({data}) => {
            //       setLoading(false)
            //       setPost(data.data )
            //     //   console.log(data)
            //     })
            //     .catch(() => {
            //       setLoading(false)
            //     })
        }, []);
    }

    const onSubmit = (ev) => {
        ev.preventDefault();
        // if (post.id) {
        //   axiosClient.put(`/posts/${post.id}`, post)
        //     .then(() => {
        //       setNotificationOnDelete('Post was successfully updated')
        //       navigate('/posts')
        //     })
        //     .catch(err => {
        //       const response = err.response;
        //       if (response && response.status === 422) {
        //         setErrors(response.data.errors)
        //       }
        //     })
        // } else {
        //   axiosClient.post('/posts', post)
        //     .then(() => {
        //       setNotificationOnDelete('Post was successfully created')
        //       navigate('/posts')
        //     })
        //     .catch(err => {
        //       const response = err.response;
        //       if (response && response.status === 422) {
        //         setErrors(response.data.errors)
        //       }
        //     })
        // }
    };

    return (
        <>
            {/* {post.id && (
                <h1 className=" font-bold text-2xl ">
                    Update post: {post.title}
                </h1>
            )}
            {!post.id && <h1 className=" font-bold text-2xl ">New post</h1>} */}
            <div className="container mx-auto animated fadeInDown bg-slate-700">
                {/* {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )} */}
                {!loading && (
                    <form onSubmit={onSubmit} className=" p-5 bg-slate-500  ">
                        <label
                            for="countries"
                            class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                            Select a Language
                        </label>
                        <select
                            id="countries"
                            className="bg-slate-600 mb-5 border-white text-white text-sm rounded-lg w-72 flex    p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            {categories.map((category) => (
                                <option value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        <input
                            className="bg-slate-600 rounded-md w-full text-white placeholder:text-white p-4"
                            value={post.title}
                            onChange={(ev) =>
                                setPost({ ...post, title: ev.target.value })
                            }
                            placeholder="title"
                        />
                        <textarea
                            className=" bg-slate-600 resize rounded-md w-full text-white placeholder:text-white p-4 h-48"
                            value={post.description}
                            onChange={(ev) =>
                                setPost({
                                    ...post,
                                    description: ev.target.value,
                                })
                            }
                            placeholder="description"
                        />

                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
}
