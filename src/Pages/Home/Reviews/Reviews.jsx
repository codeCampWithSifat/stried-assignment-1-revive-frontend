import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";
import Loading from "../../../Components/Loading";
import Review from "./Review";

const Reviews = () => {
  const axiosPublic = useAxiosPublic();
  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res?.data;
    },
  });
  if (isLoading) {
    return <Loading />;
  }
  return (
    <div className="mt-16 max-w-[1340px] mx-auto">
      <h2 className="text-indigo-800 text-3xl font-bold text-center">
        See Our Customer Review{" "}
      </h2>
      <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
        {reviews.map((review) => (
          <Review key={review._id} review={review}></Review>
        ))}
      </div>
    </div>
  );
};

export default Reviews;
