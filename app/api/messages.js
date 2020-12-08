import client from "./client";

const endpoint = "/messages";

const send = (message, listingId, userId) =>
  client.post(endpoint, {
    message,
    listingId,
    userId,
  });

const sendReply = (message, listingId, toId,fromId) =>
  client.post(`${endpoint}/reply`, {
    message,
    listingId,
    toId,
    fromId,
  });

const deleteMessage = (id) => client.delete(`${endpoint}/${id}`);

export default {
  send,
  sendReply,
  deleteMessage
};
