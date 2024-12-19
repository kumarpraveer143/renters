import React from "react";

const About = () => {
  return (
    <section className="bg-gray-100 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-semibold text-gray-800 mb-4">
            For Renters: Find Your Perfect Home
          </h2>
          <p className="text-lg text-gray-600">
            Discover trusted listings, streamline your application, and find a
            place you can call home – all at your fingertips.
          </p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-full sm:w-80 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Trusted Listings
            </h3>
            <p className="text-gray-600">
              Browse a wide range of verified properties, ensuring a secure and
              reliable rental experience.
            </p>
          </div>

          <div className="w-full sm:w-80 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Effortless Application
            </h3>
            <p className="text-gray-600">
              Apply for properties quickly and easily with our simple,
              streamlined application process.
            </p>
          </div>

          <div className="w-full sm:w-80 bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Fast Moves
            </h3>
            <p className="text-gray-600">
              Connect with landlords directly, finalize the deal, and get moving
              in no time. Experience a seamless rental process after meaningful
              interactions.
            </p>
          </div>
        </div>

        <div className="text-center mt-12">
          <p className="text-lg text-gray-600">
            Join our platform today and experience the future of property
            rentals.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
