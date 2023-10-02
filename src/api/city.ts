import axios from "axios";

export interface ICityAndPlan {
  city: string;
  type: "pickup" | "courier" | "post";
  price: number;
  currency?: "$";
  available: boolean;
}

const list: ICityAndPlan[] = [
  { city: "nur-sultan", type: "pickup", available: false, price: 0.0 },
  { city: "nur-sultan", type: "courier", available: true, price: 9.99 },
  { city: "nur-sultan", type: "post", available: true, price: 15.99 },
];

export const getCities = async (search: string) => {
  return await axios.get(
    "https://test-frontend.stage.mechta.market/delivery/check",
    {
      params: {
        search,
      },
    }
  );
};
