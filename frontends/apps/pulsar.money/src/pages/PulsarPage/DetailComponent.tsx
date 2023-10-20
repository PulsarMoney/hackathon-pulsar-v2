import { useLinks } from "@/hooks/useLinks";

export const DetailComponent = () => {
  const { isLoading, isError, data, error } = useLinks();

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <div className="w-full max-w-2xl rounded-lg m-auto my-20 bg-inherit relative flex flex-col items-center justify-center space-y-4">
      <p className="text-xl font-bold mb-4 text-white">Learn more</p>
      <div className="grid gap-4 grid-cols-1 grid-rows-3">
        {data.map((element, index) => (
          <CustomLink key={index} link={element.url} imageUrl={element.logo} content={element.description} />
        ))}
      </div>
    </div>
  );
};

interface ArticleButtonProp {
  imageUrl: string;
  content: string;
  link: string;
}

const CustomLink = (props: ArticleButtonProp) => {
  const handleClick = () => {
    window.open(props.link, "_blank");
  };

  return (
    <div
      className="bg-[#459BB51A] rounded-lg p-4 flex items-center gap-4 cursor-pointer transition duration-300 hover:bg-slate-900 hover:scale-105"
      onClick={handleClick}
    >
      <img className="object-cover w-12" src={props.imageUrl} />
      <p className="grow text-center text-white">{props.content}</p>
    </div>
  );
};
