export interface Link {
  url: string;
  description: string | undefined;
  logo: string | undefined;
}

export const fetchUserLinks = async (): Promise<Link[]> => {
  return Promise.resolve([
    {
      url: "https://www.youtube.com/",
      description: "This is my website",
      logo: undefined,
    },
    {
      url: "https://www.youtube.com/",
      description: "Please read my research paper on XYZ",
      logo: undefined,
    },
    {
      url: "https://www.youtube.com/",
      description: "This is the story of how I got into the MultiversX Ecosystem",
      logo: undefined,
    },
  ]);
};
