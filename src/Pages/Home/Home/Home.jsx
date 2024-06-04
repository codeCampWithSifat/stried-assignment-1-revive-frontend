import ChoseUs from "../ChoseUs/ChoseUs";
import HomeBanner from "../HomeBanner/HomeBanner";
import Reviews from "../Reviews/Reviews";
import Services from "../Services/Services";

const Home = () => {
  return (
    <div>
      <HomeBanner />
      <ChoseUs />
      <Services />
      <Reviews />
    </div>
  );
};

export default Home;
