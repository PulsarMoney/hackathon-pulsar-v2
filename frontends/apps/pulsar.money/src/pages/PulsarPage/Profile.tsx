import { ProfilePicture } from "./ProfilePicture";
import { UserProps } from "@/types/UserProps";

import twitter from "../../../public/assets/img/Twitter-neon.png";
import facebook from "../../../public/assets/img/Facebook-neon.png";
import linkedin from "../../../public/assets/img/Linkedin-neon.png";
import github from "../../../public/assets/img/Github-neon.png";
import instagram from "../../../public/assets/img/Instagram-neon.png";
import tiktok from "../../../public/assets/img/Tiktok-neon.png";
import youtube from "../../../public/assets/img/Youtube-neon.png";
import email from "../../../public/assets/img/Email-neon.png";

export const Profile = (props: UserProps) => {
  const linktreeMap = {
    Twitter: twitter,
    Github: github,
    Instagram: instagram,
    Linkeding: linkedin,
    Tiktok: tiktok,
    Facebook: facebook,
    Youtube: youtube,
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="mt-20 max-w-lg shadow-lg rounded-lg">
        {/* Section for user image */}
        <div className="w-32 h-32 flex mx-auto justify-center mb-6">
          <ProfilePicture imageUrl={props.data.imageUrl || ""} firstName={props.data?.firstName} lastName={props.data?.lastName} />
        </div>

        {/* Section for user name */}
        <div className="mb-4">
          <h1 className="text-center text-2xl text-white font-semibold">
            {props.data?.firstName} {props.data?.lastName}
          </h1>
        </div>

        {/* Section for user description */}
        <p className="text-white text-center flex justify-center mb-4">{props.data?.description}</p>

        {/* Section for linktree */}
        <div className="flex justify-center flex-wrap overflow-x-auto gap-6">
          {props.data.linktree.map((item, index) => (
            <a
              key={`linktree-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <img src={linktreeMap[`${item.description}`]} />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
