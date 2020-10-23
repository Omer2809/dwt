import client from "./client";

const endpoint = "/messages";

const send = (message, listingId, userId) =>
  client.post(endpoint, {
    message,
    listingId,
    userId,
  });

const deleteMessage = (id) => client.delete(`${endpoint}/${id}`);

export default {
  send,
  deleteMessage
};
