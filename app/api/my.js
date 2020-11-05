import client from "./client";

const getMyListings = () => client.get("/my/listings");
const getMyMessages = () => client.get("/my/messages/receive");
const getFavorites = () => client.get("/my/favorites");

export default {
  getMyListings,
  getMyMessages,
  getFavorites
};
