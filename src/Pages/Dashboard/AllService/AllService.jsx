import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading";
import SingleService from "./SingleService";
import { useEffect, useState } from "react";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const AllService = () => {
  const [search, setSearch] = useState([]);

  const axiosPublic = useAxiosPublic();

  const {
    data: services = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["services"],
    queryFn: async () => {
      const res = await axiosPublic.get("/services");
      return res?.data;
    },
  });

  const handleSearchOptions = (e) => {
    const option = e.target.value;
    console.log(option);
    const filterOption = services.filter(
      (service) =>
        service.name.toLowerCase().includes(option) ||
        service.title.toLowerCase().includes(option) ||
        service.price.toString().toLowerCase().includes(option)
    );
    setSearch(filterOption);
  };

  useEffect(() => {
    fetch(`https://stried-assignment-1-revive-backend.vercel.app/services`)
      .then((res) => res.json())
      .then((data) => {
        setSearch(data);
      });
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className="mb-24">
      <div className="mt-20 max-w-[1340px] mx-auto">
        <h1 className="text-indigo-800 text-center font-bold text-3xl">
          SEE OUR SERVICE PLAN
        </h1>

        <div className="form-control p-2 mt-4">
          <input
            type="text"
            placeholder="Search Your Service........."
            className="input input-bordered w-1/2 "
            onChange={handleSearchOptions}
          />
        </div>
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
          {search?.map((service) => (
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
