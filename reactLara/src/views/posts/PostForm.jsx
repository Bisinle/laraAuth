import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {axiosApi} from "../../axiosClient";
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
  const { showNotification } = useStateContext();
  const { categories, categoryError, categoryLoading } = categoryContext();
  const { currentUser } = useStateContext();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axiosApi
        .get(`/posts/${id}`)
        .then(({ data }) => {
          setLoading(false);
          setPost({
            id: data.data.id,
            title: data.data.title,
            description: data.data.description,
            category_id: data.data.category_id,
            // user_id: data.data.user_id,
          });
        })
        .catch(() => {
          setLoading(false);
        });
    }
  }, [id]);

  const onSubmit = (ev) => {
    ev.preventDefault();

    const newlyCreatedPost = {
      ...post,
      user_id: currentUser.id,
    };

    if (post.id) {
      console.log(post.category_id);

      axiosApi
        .put(`/posts/${post.id}`, post)
        .then(() => {
          showNotification("Post was successfully updated");
          navigate("/posts");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    } else {
      axiosApi
        .post("/posts", newlyCreatedPost)
        .then(() => {
          showNotification("Post was successfully created");
          navigate("/home");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {post.id && (
        <h1 className=" font-bold text-2xl text-white mb-5">
          Update post:{" "}
          <span className=" underline text-indigo-400">{post.title}</span>
        </h1>
      )}
      {!post.id && <h1 className=" font-bold text-2xl ">New post</h1>}
      <div className="container mx-auto animated fadeInDown bg-slate-700">
        {loading && <div className="text-center">Loading...</div>}
        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}
        {!loading && (
          <form onSubmit={onSubmit} className=" p-5 bg-white  ">
            {!post.category_id && (
              <p className="text-red-500">Please select a category</p>
            )}
            {categories.length > 0 ? (
              <select
                id="categories"
                className="bg-white border border-gray-300 text-gray-700 text-sm rounded-lg w-full md:w-72 p-2.5 mb-3 shadow-sm focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
                value={post.category_id || ""}
                onChange={(ev) =>
                  setPost({
                    ...post,
                    category_id: ev.target.value,
                  })
                }
                required
              >
                <option value="" disabled>
                  Select a category
                </option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            ) : (
              <p className="text-red-500">
                No categories available. Please add categories first.
              </p>
            )}
            <input
              className="bg-white border border-gray-300 shadow-sm  rounded-md w-full text-black placeholder:text-gray-600 p-4 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={post.title}
              onChange={(ev) => setPost({ ...post, title: ev.target.value })}
              placeholder="title"
            />

            <textarea
              className=" bg-white resize rounded-md w-full text-black placeholder:text-gray-600 border border-gray-300 shadow-sm p-4 h-48 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 ease-in-out"
              value={post.description}
              onChange={(ev) =>
                setPost({
                  ...post,
                  description: ev.target.value,
                })
              }
              placeholder="description"
            />

            <button className=" bg-indigo-500 border border-indigo-500 text-white rounded-md px-4 py-2 m-2 transition duration-500 ease select-none hover:text-white hover:bg-indigo-600 focus:outline-none focus:shadow-outline ">Save</button>
          </form>
        )}
      </div>
    </>
  );
}
