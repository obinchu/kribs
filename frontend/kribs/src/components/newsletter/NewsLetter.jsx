import { BiPhone } from "react-icons/bi";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import { BsSend } from "react-icons/bs";

const NewsLetter = () => {
  const formInputFields = [
    {
      value: "firstname",
      placeholder: "Your First Name",
      type: "text"
    },
    {
      value: "lastname",
      placeholder: "Your Last Name",
      type: "text"
    },
    {
      value: "email",
      placeholder: "Your Email Address",
      type: "text"
    },
    {
      value: "phone",
      placeholder: "Your Phone Number",
      type: "text"
    },
    {
      value: "message",
      placeholder: "Tell us about your desired property",
      type: "textarea",
      rows: 4,
      columns: 1
    }
  ];

  return (
    <div className="flex w-full bg-transparent h-[55vh]">
      <div className=" flex w-full h-[50vh] justify-between my-auto rounded-sm items-center bg-primary max-w-7xl mx-auto ">
        <div className="flex w-[50%]  h-full justify-center">
          <div className="flex justify-center w-[100%] rounded h-full text-tertiary items-center">
            <div className="flex flex-col h-[65%] justify-between w-[70%]">
              <span className="relative text-lg text-white font-thin p-[2px]">
                Contact
                <span className="absolute top-0 left-0 w-[7%] h-[1%] bg-white/40"></span>
                <span className="absolute bottom-0 left-0 w-[5%] h-[1%] bg-white/40"></span>
              </span>

              <span className="text-5xl font-thin tracking-wide w-[95%] my-[2px]">
                Get in touch with us today and our team will assist you
              </span>
              <p className="text-tertiary font-light text-md my-[2px]">
                Our experts and developers would love to contribute their
                expertise and insights and help you today. Contact us to help
                you plan your next transaction, either buying or selling a home.
              </p>
              <Link
                to={""}
                className="flex bg-other/50 transition ease-in-out w-[120px] h-[40px] mx-[5px] font-light text-lg flex text-sm justify-center text-primary hover:bg-transparent rounded hover:text-white hover:outline hover:outline-[2px] hover:outline-secondary "
              >
                <div className="flex w-full h-full justify-center items-center">
                  <span className="text-center text-md font-semibold">
                    Contact
                  </span>
                  <span className="m-[5px]">
                    <BiPhone size={20} />
                  </span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <div className="flex w-[50%] h-full justify-center items-center">
          <form
            className="flex flex-col w-[450px] rounded h-[95%] bg-other"
            action=""
          >
            <div className="flex flex-col justify-center p-[10px] w-full">
              <span className="text-2xl text-primary font-normal text-center">
                Get In Touch
              </span>
              <span className="text-sm text-primary font-normal text-center">
                Let Us Help You Get Your Property
              </span>
            </div>
            {formInputFields.map((field, index) => (
              <div
                key={index}
                className="flex flex-col w-full max-w-[95%] h-[30%] mx-auto"
              >
                {field.type === "textarea" ? (
                  <textarea
                    placeholder={field.placeholder}
                    rows={field.rows}
                    className="border border-gray-secondary p-[10px] m-[5px] rounded bg-transparent outline outline-secondary outline-[2px] text-sm"
                  />
                ) : (
                  <input
                    type={field.type}
                    placeholder={field.placeholder}
                    className="border border-gray-secondary p-[10px] m-[5px] rounded bg-transparent outline outline-secondary outline-[2px] text-sm"
                  />
                )}
              </div>
            ))}
            <div className="flex flex-col justify-between p-[10px] items-center w-full h-[60%]">
              <div className="flex flex-col w-full max-w-[95%]">
                <span className="font-bold text-sm">Agreement</span>
                <div className="flex items-start space-x-2 w-full">
                  <input
                    className="mt-1 h-4 w-4 text-primary border-gray-300 rounded focus:ring-blue-500"
                    type="checkbox"
                    name="consent"
                    id="consent"
                  />
                  <label htmlFor="consent" className="text-sm font-light">
                    I consent to having this website store my submitted
                    information so they can respond to my inquiry.
                  </label>
                </div>
              </div>
              <Button
                name={"Submit"}
                icon={<BsSend size={20} />}
                path={"/login"}
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsLetter;
