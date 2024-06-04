/* eslint-disable no-unused-vars */
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

/* eslint-disable react/prop-types */
const SingleService = ({ service, refetch }) => {
  // console.log(service);
  const { image, name, description, price, _id, title } = service;
  const axiosSecure = useAxiosSecure();

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You Want Delete Your Item!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/services/${id}`).then((res) => {
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your Item has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
  return (
    <div>
      <div className="card  glass mt-12 ">
        <figure>
          <img src={image} alt="car!" />
        </figure>
        <div className="card-body text-center">
          <h3 className="text-indigo-800 text-2xl font-bold">{title}</h3>
          <h3 className="text-indigo-800 text-2xl font-bold">{name}</h3>
          <h3 className="text-indigo-800 text-2xl font-bold">
            Price : $ {price}
          </h3>
          <div className="text-justify">
            <p>{description}</p>
          </div>
        </div>
        <div className="flex justify-center">
          <div>
            <Link to={`/dashboard/editservice/${_id}`}>
              <button className="btn btn-active btn-primary btn-sm">
                Edit Service
              </button>
            </Link>
          </div>
          <div className="mx-2">
            <Link to={`/dashboard/servicedetails/${_id}`}>
              <button className="btn btn-active btn-primary btn-sm">
                More Info
              </button>
            </Link>
          </div>
          <div>
            <button
              onClick={() => handleDelete(_id)}
              className="btn btn-active btn-error btn-sm"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleService;
