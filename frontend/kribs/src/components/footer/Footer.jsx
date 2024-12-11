import {
  BsFacebook,
  BsInstagram,
  BsTwitter,
  BsWhatsapp,
  BsTelephone,
  BsLinkedin,
} from "react-icons/bs";
import { PiEnvelopeSimpleThin } from "react-icons/pi";
import { AiOutlineCopyrightCircle } from "react-icons/ai";
import { CiLocationOn } from "react-icons/ci";

const Footer = () => {
  const footerData = {
    brand: {
      name: "KULPROPERTIES",
      slogan:
        "Let us guide you every step of the way in making your dream home a reality.",
    },
    getInTouch: {
      location: {
        icon: <CiLocationOn size={20} />,
        text: "Nairobi, Kenya",
      },
      phone: {
        icon: <BsTelephone size={20} />,
        text: "+254-7-59-242-900",
      },
      email: {
        icon: <PiEnvelopeSimpleThin size={20} />,
        text: "info@kulproperties.com",
      },
    },
    quickLinks: [
      ["About", "Blog", "All Products", "Locations"],
      ["Order Tracking", "Wish List", "Login", "My Account"],
    ],
    socialLinks: [
      { icon: <BsFacebook size={25} />, url: "", hoverColor: "hover:text-blue-600" },
      { icon: <BsInstagram size={25} />, url: "", hoverColor: "hover:text-pink-400" },
      { icon: <BsTwitter size={25} />, url: "", hoverColor: "hover:text-blue-400" },
      { icon: <BsLinkedin size={25} />, url: "", hoverColor: "hover:text-blue-500" },
      { icon: <BsWhatsapp size={25} />, url: "", hoverColor: "hover:text-green-600" },
    ],
    copyright: {
      icon: <AiOutlineCopyrightCircle size={20} />,
      text: ". All Rights Reserved",
    },
  };

  return (
    <div className="w-full bottom-0 left-0 h-[40vh] md:h-[30vh] text-sm bg-primary text-white flex flex-col justify-center items-center ">
      <div className="block md:flex md:max-w-7xl w-full max-h-[85%] md:h-[75%]  -auto p-2 border-b-2 border-white">
        <div className="flex justify-center  flex-col w-full">
          <div className="flex flex-col max-h-[30%]">
            <span className="text-xl font-medium">{footerData.brand.name}</span>
            <p className="mt-2">{footerData.brand.slogan}</p>
          </div>
          <div className="flex flex-col max-h-[50%] justify-center">
            <span className="flex my-2">
              {footerData.getInTouch.location.icon} {footerData.getInTouch.location.text}
            </span>
            <span className="flex my-2">
              {footerData.getInTouch.phone.icon} {footerData.getInTouch.phone.text}
            </span>
            <span className="flex my-2">
              {footerData.getInTouch.email.icon} {footerData.getInTouch.email.text}
            </span>
          </div>
        </div>

        <div className="flex flex-col justify-center mt-3 md:mt-0 mx-1 w-full">
          <span className="text-xl font-medium">Quick Links</span>
          <div className="flex w-full">
            <div className="flex flex-col w-full mx-2">
              {footerData.quickLinks[0].map((link, index) => (
                <span key={index} className="py-2 hover:font-semibold hover:cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
            <div className="flex flex-col w-full">
              {footerData.quickLinks[1].map((link, index) => (
                <span key={index} className="py-2 hover:font-semibold cursor-pointer">
                  {link}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col my-1 md:my-6 mx-auto">
        <ul className="flex mt-2 mx-auto">
          {footerData.socialLinks.map((social, index) => (
            <li key={index} className={`m-1 ${social.hoverColor}`}>
              <a href={social.url}>{social.icon}</a>
            </li>
          ))}
        </ul>
        <span className="mx-auto text-sm flex">
          {footerData.copyright.icon}@ibrah {footerData.copyright.text}
        </span>
      </div>
    </div>
  );
};

export default Footer;
