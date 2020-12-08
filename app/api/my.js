import client from "./client";

const getMyListings = () => client.get("/my/listings");
const getMyMessages = () => client.get("/my/messages/receive");
const getFavorites = () => client.get("/my/favorites");
const getChat = (toUserId, listingId) =>
  client.post("/my/chat", { toUserId, listingId });

export default {
  getMyListings,
  getMyMessages,
  getFavorites,
  getChat,
};
