import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import { Link } from "react-router-dom";

const DashboardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data, isLoading } = useQuery({
    queryKey: ["users", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users?email=${user?.email}`);
      return res?.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="flex justify-center items-center">
      <div className="card w-1/2 bg-base-100 shadow-xl mt-24">
        <div className="avatar ml-10">
          <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
            <img src={data?.image ? data?.image : null} />
          </div>
        </div>

        <div className="card-body">
          <h2 className="card-title text-indigo-700 font-bold text-2xl">
            {data?.name}
          </h2>
          <p>{data?.email}</p>
          <p>{data?.presentAddress ? data?.presentAddress : null}</p>
          <p>{data?.permanentAddress ? data?.permanentAddress : null}</p>
          <p>{data?.phoneNumber ? data?.phoneNumber : null}</p>
          <p>{data?.bloodGroup ? data?.bloodGroup : null}</p>
          <div className="card-actions justify-end">
            <Link to={`/dashboard/updateProfile/${data?._id}`}>
              <button className="btn btn-primary btn-sm">Update Profile</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHome;
