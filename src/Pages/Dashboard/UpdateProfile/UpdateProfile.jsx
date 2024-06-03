import { useLoaderData, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const imageBB_Upload_Key = import.meta.env.VITE_imageBB_Upload_Secret;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${imageBB_Upload_Key}`;

const UpdateProfile = () => {
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { name, email, _id } = useLoaderData();
  console.log(_id);

  const onSubmit = async (data) => {
    const formData = new FormData();
    const imageFile = { image: data.image[0] };
    formData.append("file", imageFile);
    const imageRes = await axiosPublic.post(image_hosting_api, imageFile, {
      headers: {
        "content-type": "multipart/form-data",
      },
    });
    const updateUserInfo = {
      name: data.name,
      email: data.email,
      bloodGroup: data.bloodGroup,
      presentAddress: data.presentAddress,
      permanentAddress: data.permanentAddress,
      aboutYourSelf: data.aboutYourSelf,
      date: data.date,
      phoneNumber: data.phoneNumber,
      maritalStatus: data.maritalStatus,
      image: imageRes.data?.data?.display_url,
    };
    console.log(updateUserInfo);

    const res = await axiosSecure.put(`/users/${_id}`, updateUserInfo);
    if (res?.data?.modifiedCount > 0) {
      navigate("/dashboard/dashboardHome");
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: `Update Profile Information Successfully`,
        showConfirmButton: false,
        timer: 1500,
      });
    }
    console.log(res);
  };
  return (
    <div>
      <div className="max-w-screen-md mx-auto">
        <div className="w-full px-10">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex my-4">
              <div className="form-control w-full mr-4 ">
                <label className="label">
                  <span className="label-text font-semibold">User Name *</span>
                </label>
                <input
                  {...register("name", { required: true })}
                  className="input input-bordered"
                  defaultValue={name}
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">User Email *</span>
                </label>
                <input
                  type="text"
                  {...register("email", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                  defaultValue={email}
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Blood Group *
                  </span>
                </label>
                <select
                  type="text"
                  {...register("bloodGroup", { required: true })}
                  placeholder="Type here"
                  className="select select-bordered"
                >
                  <option selected disabled>
                    Select One
                  </option>
                  <option value={"A+"}>A+</option>
                  <option value={"A-"}>A-</option>
                  <option value={"B+"}>B+</option>
                  <option value={"B-"}>B-</option>
                  <option value={"AB+"}>AB+</option>
                  <option value={"AB-"}>AB-</option>
                  <option value={"O+"}>O+</option>
                  <option value={"O-"}>O-</option>
                </select>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Present Address *
                  </span>
                </label>
                <input
                  {...register("presentAddress", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Permanent Address *
                  </span>
                </label>
                <input
                  type="text"
                  {...register("permanentAddress", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    Date Of Birth *
                  </span>
                </label>
                <input
                  type="date"
                  {...register("date", { required: true })}
                  className="input input-bordered"
                ></input>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    Phone Number *
                  </span>
                </label>
                <input
                  type="text"
                  {...register("phoneNumber", { required: true })}
                  placeholder="Type here"
                  className="input input-bordered"
                ></input>
              </div>
              <div className="form-control w-full ">
                <label className="label">
                  <span className="label-text font-semibold">
                    About Your Self *
                  </span>
                </label>
                <textarea
                  type="text"
                  {...register("aboutYourSelf", { required: true })}
                  className="input input-bordered"
                ></textarea>
              </div>
            </div>

            <div className="flex my-4">
              <div className="form-control w-full mr-4">
                <label className="label">
                  <span className="label-text font-semibold">
                    {" "}
                    Marital Status *
                  </span>
                </label>
                <select
                  type="text"
                  {...register("maritalStatus", { required: true })}
                  placeholder="Type here"
                  className="select select-bordered"
                >
                  <option selected disabled>
                    Select One
                  </option>
                  <option value={"married"}>Married</option>
                  <option value={"unMarried"}>UnMarried</option>
                  <option value={"divorced"}>Divorced</option>
                </select>
              </div>
              <div className="form-control w-full ">
                <div className="form-control w-full mr-4">
                  <label className="label">
                    <span className="label-text font-semibold">
                      {" "}
                      Upload Photo *
                    </span>
                  </label>
                  <input
                    type="file"
                    {...register("image", { required: true })}
                    placeholder="Type here"
                    className="file-input file-input-bordered file-input-md"
                  ></input>
                </div>
              </div>
            </div>

            <button
              className="btn btn-sm mt-4 bg-indigo-600 text-white hover:bg-indigo-600 hover:text-black"
              type="submit"
            >
              Update Profile
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
