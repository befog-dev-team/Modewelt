"use client";
import Image from "next/image";
import img1 from "../../../public/Images/l1.png";
import img2 from "../../../public/Images/l2.png";
import img3 from "../../../public/Images/l3.png";
import img4 from "../../../public/Images/l4.png";
import img5 from "../../../public/Images/l5.png";
import img6 from "../../../public/Images/l6.png";
import img7 from "../../../public/Images/l7.png";
import img8 from "../../../public/Images/l8.webp";
import img9 from "../../../public/Images/l9.webp";
import img10 from "../../../public/Images/l10.png";

const initialFeatures = [
  { title: "Exclusive for Fashion Industry", img: img1 },
  { title: "Connect with Top Brands & Recruiters", img: img2 },
  { title: "Showcase Your Portfolio", img: img3 },
  { title: "Freelance & Full-Time Opportunities", img: img4 },
  { title: "Networking & Collaboration", img: img5 },
  { title: "Verified Job Listings", img: img6 },
  { title: "Career Growth & Learning", img: img7 },
  { title: "Industry Insights & Trends", img: img8 },
  { title: "Mentorship & Expert Guidance", img: img9 },
  { title: "Access to Exclusive Fashion Events", img: img10 },
];

export default function WhyChooseSection() {
  return (
    <section className="relative py-20 px-4 md:px-8 lg:px-16 overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1712264246749-a9be728ea874?q=80&w=2000&auto=format&fit=crop')" }}
      ></div>
      {/* Overlay with Top and Bottom Blends for Seamlessness */}
      <div 
        className="absolute inset-0 z-0 backdrop-blur-[2px]"
        style={{
          background: "linear-gradient(to bottom, white 0%, rgba(255, 255, 255, 0.9) 15%, rgba(255, 255, 255, 0.9) 85%, white 100%)"
        }}
      ></div>

      <div className="relative z-10">
        <h2 className="text-3xl text-[#7b4fff] md:text-4xl font-bold text-center mb-12">
          Why Choose ModeweltJob?
        </h2>
        <div className="flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {initialFeatures.map((feature, index) => (
              <figure
                key={index}
              className="w-40 h-40 sm:w-48 sm:h-48 md:w-56 md:h-56 flex flex-col items-center justify-center rounded-lg p-4 text-center"
            >
              <Image
                src={feature.img}
                alt={feature.title}
                className="rounded-lg w-40 h-40 sm:w-30 sm:h-30 md:w-56 md:h-56 object-cover mt-4 p-4"
              />
              <figcaption className="text-sm md:text-base font-medium pb-6">
                {feature.title}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
      </div>
    </section>
  );
}
