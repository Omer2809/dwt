import client from "./client";

const endpoint = "/users";

const register = (userInfo) => client.post(endpoint, userInfo);

const getUser = (userId) => client.get(`${endpoint}/userProfile/${userId}`);

const deleteImage = (userId) =>
  client.put(`${endpoint}/deleteProfileImage/${userId}`);

const updateImage = (image, userId) => {
  const data = new FormData();

  let images = [];
  images.push(image);

  images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  return client.put(`${endpoint}/${userId}`, data);
};

export default { register, updateImage, deleteImage, getUser };
