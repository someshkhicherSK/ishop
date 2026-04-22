
import Image from "next/image";
import {
  FaFacebook,
  FaInstagram,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";

import Link from "next/link";
import { getCategory } from "../../../../../library/api_calls";

async function Footer() {
  const category = await getCategory();

  const socailLink = [
    {
      icon: <FaGithub />,
      link: "https://github.com/"
    },
    {
      icon: <FaFacebook />,
      link: "https://www.facebook.com/"
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/"
    },
    {
      icon: <FaLinkedin />,
      link: "https://www.linkedin.com/"
    },

  ]


  return (
    <footer className="bg-white py-6 px-4">
      {/* <div className="container mx-auto px-4 py-6 my-4"> */}
      {/* Top Section */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Left Info */}
        <div className="flex-1">
          <h1 className="font-bold text-lg sm:text-xl lg:text-[18px]">
            I-Shop - 1st indain online market
          </h1>
          <div>
            <div className="my-3">
              <p className="text-sm">Available 24/7</p>
              <h3 className="font-bold text-2xl sm:text-3xl text-[#1ABA1A]">
                (+91) 6375256614
              </h3>
            </div>
            <div className="my-3 text-sm sm:text-base">
              <p>455 jhunjhunun, Road, jhunjhunu, 333704</p>
              <p>someshk1@gmail.com</p>
            </div>
            <div className="flex items-center gap-3 flex-wrap">
              {socailLink?.map(
                (item, idx) => (
                  <Link key={idx} href={item.link}>
                    <div
                      className="p-2 flex justify-center items-center bg-[#E1E3EB] rounded-full"
                    >
                      {item.icon}
                    </div>
                  </Link>
                )
              )}
            </div>


          </div>
        </div>

        {/* Right Links & Subscribe */}
        <div className="flex-1">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            <ul>
              <h3 className="text-lg font-semibold mb-3 capitalize">
                top Categories
              </h3>
              {category?.data?.slice(0, 10).map((item, i) => (
                <Link key={i} href={`/store/${item.slug}`}>
                  <li className="text-sm text-[#666666]">
                    {item.name}
                  </li>
                </Link>
              ))}
            </ul>
            <ul>
              <h3 className="text-lg font-semibold mb-3 capitalize">company</h3>
              {[
                "About Swoo",
                "Contact",
                "Career",
                "Blog",
                "Sitemap",
                "Store Locations",
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#666666]">
                  {item}
                </li>
              ))}
            </ul>

            <ul>
              <h3 className="text-lg font-semibold mb-3 capitalize">help center</h3>
              {[
                "Customer Service",
                "Policy",
                "Terms & Conditions",
                "Trach Order",
                "FAQs",
                "My Account",
                "Product Support",
              ].map((item, i) => (
                <li key={i} className="text-sm text-[#666666]">
                  {item}
                </li>
              ))}
            </ul>

            <ul>
              <h3 className="text-lg font-semibold mb-3 capitalize">partner</h3>
              {["Become Seller", "Affiliate", "Advertise", "Partnership"].map(
                (item, i) => (
                  <li key={i} className="text-sm text-[#666666]">
                    {item}
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Subscribe Section */}
          <div className="my-6">
            <div className="font-bold text-lg capitalize mb-3">
              subscribe & get <span className="text-red-500">10%</span> off for
              your first order
            </div>
            <div className="border-b-2 border-[#CCCCCC] flex justify-between items-center px-4 py-2 my-2">
              <input
                type="text"
                placeholder="enter your email address..."
                className="border-0 capitalize outline-0 text-sm flex-1"
              />
              <button className="uppercase text-[#1ABA1A] text-sm font-semibold">
                Subscribe
              </button>
            </div>
            <p className="text-[#666666] text-xs sm:text-sm">
              By subscribing, you’re accepting our Policy
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t-2 border-[#E1E3EB] mt-6 pt-4 flex flex-col lg:flex-row justify-between items-center gap-4">
        <div className="text-sm text-center lg:text-left">
          © 2026 <span className="font-bold">Shawonetc3</span>. All Rights
          Reserved
        </div>

        <div className="flex gap-3 items-center justify-center flex-wrap">
          {["/payment/pay1.png", "/payment/pay2.png", "/payment/pay3.png", "/payment/pay4.png", "/payment/pay5.png"].map((src, i) => (
            <Image key={i} src={src} alt="Logo" width={40} height={20} />
          ))}
        </div>

        <div className="text-[#0D6EFD] font-semibold text-sm cursor-pointer">
          Mobile Site
        </div>
      </div>
      {/* </div> */}
    </footer>
  );
}

export default Footer;


