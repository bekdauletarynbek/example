import axios from "axios";

export const getCities = async (search: string) => {
  const data = await axios.get(
    "https://test-frontend.stage.mechta.market/delivery/check",
    {
      params: {
        search,
      },
    }
  );
  return data;
};
