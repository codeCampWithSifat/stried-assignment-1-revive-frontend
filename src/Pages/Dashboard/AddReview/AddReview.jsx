import { useForm } from "react-hook-form";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../../Hooks/useAuth";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;
const AddReview = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const handleReview = async (data) => {
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const res = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    if (res.data?.success) {
      const addReview = {
        name: data.name,
        position: data.position,
        description: data.description,
        image: res.data?.data?.display_url,
      };
      const addService = await axiosSecure.post(`/reviews`, addReview);
      if (addService.data?.insertedId) {
        reset();
        navigate("/");
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Add A Review Successfully`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    }
  };
  return (
    <div className="h-[600px] flex justify-center items-center">
      <div className="w-96 p-4">
        <h2 className="text-3xl text-center text-indigo-600 font-bold">
          Please Give Your Review
        </h2>

        <form onSubmit={handleSubmit(handleReview)}>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-md">Image</span>
            </label>
            <input
              {...register("image", { required: "Image is Required" })}
              type="file"
              className="input input-bordered w-full "
            />
            {errors.image && (
              <p role="alert" className="text-red-600 my-2">
                {errors.image?.message}
              </p>
            )}
          </div>
          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-md"> Name</span>
            </label>
            <input
              {...register("name", { required: "Name is Required" })}
              type="text"
              className="input input-bordered w-full "
            />
            {errors.name && (
              <p role="alert" className="text-red-600 my-2">
                {errors.name?.message}
              </p>
            )}
          </div>

          <div className="form-control w-full ">
            <label className="label">
              <span className="label-text text-md">Your Position</span>
            </label>
            <input
              {...register("position", {
                required: "Your Position is Required",
              })}
              type="text"
              className="input input-bordered w-full "
            />
            {errors.position && (
              <p role="alert" className="text-red-600 my-2">
                {errors.position?.message}
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
            />
            {errors.description && (
              <p role="alert" className="text-red-600 my-2">
                {errors.description?.message}
              </p>
            )}
          </div>

          <input
            type="submit"
            className="input input-bordered w-full bg-primary text-white my-4"
            value="Give Your Review"
          />
        </form>
      </div>
    </div>
  );
};

export default AddReview;
