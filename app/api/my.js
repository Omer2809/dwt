import client from "./client";

const getMyListings = () => client.get("/my/listings");
const getMyMessages = () => client.get("/my/messages/receive");

export default {
  getMyListings,
  getMyMessages,
};
