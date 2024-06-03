import { Link, useLoaderData } from "react-router-dom";

const ServiceDetails = () => {
  const { image, name, description, price } = useLoaderData();
  return (
    <div>
      <div className="card  glass mt-12 ">
        <figure>
          <img src={image} alt="car!" />
        </figure>
        <div className="card-body text-center">
          <h3 className="text-indigo-800 text-2xl font-bold">{name}</h3>
          <h3 className="text-indigo-800 text-2xl font-bold">
            Price : $ {price}
          </h3>
          <p className="text-justify">{description}</p>
        </div>
        <div>
          <Link to={`/dashboard/allservice`}>
            <button className="btn btn-active btn-primary btn-sm">
              Go To Service
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetails;
