import client from "./client";

const endpoint = "/favorites";

const addFavorite = (listingId, userId) =>
  client.post(endpoint, {
    listingId,
    userId,
  });

const checkFavorite = (listingId, userId) =>
  client.post(`${endpoint}/favorited`, {
    listingId,
    userId,
  });

const deleteFavorite = (id) => client.delete(`${endpoint}/${id}`);

const deleteParticularFavorite = (listingId, userId) =>
  client.post(`${endpoint}/deleteParticular`, { listingId, userId });

export default {
  addFavorite,
  deleteFavorite,
  checkFavorite,
  deleteParticularFavorite,
};
