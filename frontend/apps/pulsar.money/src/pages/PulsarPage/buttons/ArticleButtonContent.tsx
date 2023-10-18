import { ArticleButtonProps } from "@/types/ArticleButtonProps";

export const ArticleButtonContent = (props: ArticleButtonProps) => {
  return (
    <div className="flex w-full h-full">
      <div className="lg:w-16 lg:h-16 md:w-12 md:h-12 sm:w-8 sm:h-8 my-auto mr-6">
        <img src={props.imageUrl} className="ml-4"></img>
      </div>
      <div className="w-full mt-8 mr-4">
        <p className="lg:text-xl md:text-base sm:text-sm text-white">{props.content}</p>
      </div>
    </div>
  );
};
