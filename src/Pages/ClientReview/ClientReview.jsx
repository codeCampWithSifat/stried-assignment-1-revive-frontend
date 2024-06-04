import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loading from "../../Components/Loading";
import Review from "../Home/Reviews/Review";

const ClientReview = () => {
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
    <div>
      <div className="max-w-[1340px] mx-auto">
        <div className="">
          <div className="">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5">
              {reviews.map((review) => (
                <Review key={review._id} review={review}></Review>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientReview;
