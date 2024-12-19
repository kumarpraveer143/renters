import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleAccordion = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "How do I register?",
      answer:
        "To register, simply click on the 'Sign Up' button on our homepage. Fill in your details and verify your email. Once completed, you can start listing or searching for rooms.",
    },
    {
      question: "What payment methods available?",
      answer:
        "We accept various payment methods, including credit cards and bank transfers. All transactions are securely processed through our integrated payment system. You can easily manage your payment preferences in your account settings.",
    },
    {
      question: "How to search rooms?",
      answer:
        "You can search for rooms by entering your desired pin code or using the Google Maps interface. Filter results based on your preferences like price, location, and amenities. This makes finding the perfect room quick and easy.",
    },

    {
      question: "Can I communicate directly?",
      answer:
        "Yes, our platform enables seamless communication between landlords and tenants. You will receive notifications and reminders for important updates. This ensures that both parties stay informed throughout the rental process.",
    },
    {
      question: "Is there a history log?",
      answer:
        "Absolutely! Our service includes a history management feature for both landlords and tenants. You can easily access records of past communications and transactions for your reference.",
    },
  ];
  return (
    <div>
      <section className="text-gray-700 body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900">
              Your Search for the &nbsp;
              <br className="hidden lg:inline-block" />
              Perfect Rental Ends Here.
            </h1>
            <p className="mb-8 leading-relaxed">
              Welcome to our platform where landowners and tenants connect
              effortlessly. Explore available rooms or list your property today
              for a seamless renting experience.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-gray-800 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">
                Search Rooms
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img
              className="object-cover object-center rounded"
              alt="rent"
              src="images/rent.jpg"
            />
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 py-10 md:py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-20">
            <h2 className="text-xs text-indigo-500 tracking-widest font-medium title-font mb-1">
              Connect
            </h2>
            <h1 className="sm:text-3xl text-2xl font-medium title-font text-gray-900">
              Discover Your Perfect Room Effortlessly
            </h1>
            <p className="leading-relaxed mt-3 text-gray-500 text-sm">
              Our platform simplifies the process of finding and renting rooms.
              With user-friendly features, you can easily upload room details or
              search for available options in your area.
            </p>
          </div>
          <div className="flex flex-wrap -m-4">
            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="mb-3">
                  <img
                    src="images/room1.jpg"
                    alt="Room Image"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3 text-center">
                    Effortless Room Uploads for Landowners
                  </h2>
                  <p className="leading-relaxed text-base text-center">
                    Landowners can quickly upload room details and images,
                    making it easy to showcase their spaces.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="mb-3">
                  <img
                    src="images/direction.jpg"
                    alt="Room Image"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3 text-center">
                    Advanced Search Options for Tenants
                  </h2>
                  <p className="leading-relaxed text-base text-center">
                    Tenants can search for rooms using pin codes or Google Maps
                    for convenience.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 md:w-1/3">
              <div className="flex rounded-lg h-full bg-gray-100 p-8 flex-col">
                <div className="mb-3">
                  <img
                    src="images/payment.jpg"
                    alt="Room Image"
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <div className="flex-grow">
                  <h2 className="text-gray-900 text-lg title-font font-medium mb-3 text-center">
                    Secure Integrated Payment System
                  </h2>
                  <p className="leading-relaxed text-base text-center">
                    Our platform ensures secure transactions with an integrated
                    payment system.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="text-gray-700 body-font border-t border-gray-200">
        <div className="container px-5 md:py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/2 w-full mb-10 lg:mb-0 rounded-lg overflow-hidden">
            <img
              alt="feature"
              className="object-cover object-center h-full w-full"
              src="/images/tolet3.png"
            />
          </div>
          <div className="flex flex-col flex-wrap lg:py-6 -mb-10 lg:w-1/2 lg:pl-12 lg:text-left justify-center">
            <div className="flex flex-col mb-10 lg:items-start items-center ">
              <div className="flex-grow">
                <h2 className="text-gray-900 text-3xl title-font font-medium mb-3">
                  No More to Let – The Future of Property Rentals
                </h2>
                <p className="leading-relaxed text-base mb-5">
                  Our platform is designed to ensure that your properties never
                  stay vacant for long. With streamlined application processes,
                  smart tenant matching, and a trusted network, we make renting
                  effortless for both landlords and tenants.
                </p>

                {/* For Landlords Section */}
                <h3 className="text-gray-900 text-lg font-medium mb-3">
                  For Landlords
                </h3>
                <ul className="leading-relaxed text-base list-disc pl-5 mb-5">
                  <li>
                    Post your listings and watch them fill faster than ever.
                  </li>
                  <li>
                    Enjoy a hassle-free experience with verified tenants and
                    optimized marketing tools.
                  </li>
                </ul>

                {/* For Renters Section */}
                <h3 className="text-gray-900 text-lg font-medium mb-3">
                  For Renters
                </h3>
                <ul className="leading-relaxed text-base list-disc pl-5 mb-5">
                  <li>Find your perfect home in no time.</li>
                  <li>
                    With trusted listings and an easy application process, your
                    next move is just a click away.
                  </li>
                </ul>

                <p className="leading-relaxed text-base mb-5">
                  With 'No More to Let,' we’re redefining the rental market by
                  connecting properties and people, effortlessly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-6">
        <div className="mx-auto px-4 py-8 container">
          <h2 className="text-xl font-semibold text-gray-800 mb-6">
            Frequently Asked Questions
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <button
                  className="w-full text-left p-4 flex items-center justify-between text-lg font-medium text-gray-800 bg-gray-100 rounded-t-lg focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    className={`w-6 h-6 transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-45" : ""
                    }`}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
                <div
                  className={`transition-max-height duration-500 ease-in-out overflow-hidden ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="p-4 text-gray-700 bg-gray-50">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col items-center space-y-4 mt-8 mb-14">
          <h2 className="text-xl font-semibold text-gray-800">
            Still Have Questions?
          </h2>
          <Link
            to="/contact"
            className="bg-gray-800 hover:bg-gray-900 text-white font-medium py-2 px-6 rounded shadow"
          >
            Contact Us
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;
