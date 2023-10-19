import { User } from "@/types/User";
import axios from "axios";

export const fetchUserData = async (): Promise<User> => {
  // const token =
  //   "ZXJkMXU3amNqMG1uc3p1dGp1M2hscjNmdDk5OHVsMzd6M3pndnRzam1mODJwa2t4NWN3NTN3anNxdmhuNnE.YUhSMGNITTZMeTkxZEdsc2N5NXRkV3gwYVhabGNuTjRMbU52YlEuNjhlN2Y0MmQ3N2M5OGQ2YzZmZGJiZDJmYmI2YjFmZTU3OGM1ZDlhNDYwZTdjNTRlMjE2YWU2ZjQyYWE5ZWFiMC43MjAwLmV5SjBhVzFsYzNSaGJYQWlPakUyT1RZeE5Ea3hORFI5.6aa1702f9e3570a01c68d066304238c0fe6225281217d319dbcc3e4692906646f98be5d3866af12c70ed25ae6e6a6b57a4fd62efe5ff5b010644541f254ed908";
  // const response = axios.get("http://localhost:3000/users", {
  //   headers: {
  //     Authorization: `Bearer ${token}`,
  //   },
  // });
  // return (await response).data[0] as User;
  return Promise.resolve({
    firstName: "Matthew",
    lastName: "Jopinsky",
    imageUrl:
      "https://www.usnews.com/object/image/0000015c-44e8-daf0-a5dc-5ce84d3d0000/170526-jfk-editorial.jpg?update-time=1495805729390&size=responsive640",
    description:
      "Welcome to my creative corner! Here, I delve into the intricacies of my craft, sharing exclusive content and behind-the-scenes looks that you won't find anywhere else. ",
    linktree: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
    balanceList: [
      {
        amount: 0,
        price: 0,
        svg: "https://media.multiversx.com/tokens/asset/USDC-c76f1f/logo.svg",
        label: "Egld",
        decimals: 10 ** 18,
        identifier: "Egld",
        balance: "0",
        valueUsd: 0,
        isWhitelisted: true,
      },
      {
        amount: 0,
        price: 0,
        svg: "https://media.multiversx.com/tokens/asset/USDC-c76f1f/logo.svg",
        label: "Usdc",
        decimals: 10 ** 18,
        balance: "0",
        valueUsd: 0,
        isWhitelisted: true,
        identifier: "USDC-8d4068",
      },
    ],
  });
};
