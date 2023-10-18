import { Icon } from "./Icon";
import { UserProp } from "@/types/UserProps";

export const Profile = (props: UserProp) => {
  return (
    <div className="flex justify-center items-center h-full">
      {/* ToDo: Eventual cu flex, flex-col, justify-center, items-center, gap-4 */}
      <div className="mt-20 max-w-lg shadow-lg rounded-lg">
        {/* Section for user image */}
        {/* ToDo: Daca n are poza sa puna ca la google initialele userului */}
        <div className="w-32 h-32 flex mx-auto justify-center mb-6">
          <Icon imageUrl={""} firstName={props.data?.firstName} lastName={props.data?.lastName} />
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
          {props.data?.linktree.map((item, index) => (
            <a
              key={`linktree-${index}`}
              href={item}
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center"
            >
              <img src="https://www.transparentpng.com/thumb/google-logo/google-logo-png-icon-free-download-SUF63j.png" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
