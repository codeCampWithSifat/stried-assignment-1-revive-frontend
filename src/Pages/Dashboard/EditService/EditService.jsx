import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import Swal from "sweetalert2";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;
const EditService = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { description, name, price, title, _id } = useLoaderData();
  const handleUpdate = async (data) => {
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });

    // console.log(res);
    if (res.data?.success) {
      const serviceItem = {
        title: data.title,
        name: data.name,
        price: parseFloat(data.price),
        description: data.description,
        image: res.data?.data?.display_url,
      };
      const addService = await axiosSecure.put(`/services/${_id}`, serviceItem);
      if (addService.data?.acknowledged) {
        reset();
        navigate("/dashboard/allservice");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Update A Service Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };

  return (
    <div>
      <div className="h-[600px] flex justify-center items-center ">
        <div className="w-3/4 p-4 mt-40">
          <h2 className="text-3xl text-center text-indigo-600 font-bold">
            Update A Service{" "}
          </h2>

          <form onSubmit={handleSubmit(handleUpdate)}>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Title</span>
              </label>
              <input
                {...register("title", { required: "Title is Required" })}
                type="text"
                className="input input-bordered w-full "
                placeholder="Enter Your Title"
                defaultValue={title}
              />
              {errors.title && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.title?.message}
                </p>
              )}
            </div>
            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Name</span>
              </label>
              <input
                {...register("name", {
                  required: "Name is Required",
                })}
                type="text"
                className="input input-bordered w-full "
                placeholder="Enter Your Service Name"
                defaultValue={name}
              />
              {errors.name && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.name?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Price</span>
              </label>
              <input
                {...register("price", {
                  required: "Price is Required",
                })}
                type="number"
                className="input input-bordered w-full "
                placeholder="Enter Your Price"
                defaultValue={price}
              />
              {errors.price && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.price?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Description</span>
              </label>
              <textarea
                {...register("description", {
                  required: "Description is Required",
                })}
                type="text"
                className="input input-bordered w-full "
                placeholder="Enter Your description"
                defaultValue={description}
              />
              {errors.description && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.description?.message}
                </p>
              )}
            </div>

            <div className="form-control w-full ">
              <label className="label">
                <span className="label-text text-md">Image Link</span>
              </label>
              <input
                {...register("image", {
                  required: "Image is Required",
                })}
                type="file"
                className="input input-bordered w-full "
                placeholder="Enter Your Image Link"
              />
              {errors.image && (
                <p role="alert" className="text-red-600 my-2">
                  {errors.image?.message}
                </p>
              )}
            </div>

            <input
              type="submit"
              value="Update Service"
              className="input input-bordered w-full bg-primary text-white my-4"
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditService;
