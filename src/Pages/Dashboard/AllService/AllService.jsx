import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../../Components/Loading";
import SingleService from "./SingleService";

const AllService = () => {
  const axiosSecure = useAxiosSecure();
  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosSecure.get("/services");
      return res?.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mb-24">
      <div className="mt-20 max-w-[1340px] mx-auto">
        <h1 className="text-indigo-800 text-center font-bold text-3xl">
          SEE OUR SERVICE PLAN
        </h1>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {services?.map((service) => (
            <SingleService
              key={service._id}
              service={service}
              refetch={refetch}
            ></SingleService>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllService;
