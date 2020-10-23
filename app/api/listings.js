import client from "./client";

const endpoint = "/listings";

const getListings = () => client.get(endpoint);

const deleteListing = (id) => client.delete(`${endpoint}/${id}`);

export const addListing = (listing, onUploadProgress) => {
  const data = new FormData();
  data.append("title", listing.title);
  data.append("price", listing.price);
  data.append("categoryId", listing.category._id);
  data.append("description", listing.description);
  data.append("userId", listing.userId);

  listing.images.forEach((image, index) =>
    data.append("images", {
      name: "image" + index,
      type: "image/jpeg",
      uri: image,
    })
  );

  if (listing.location)
    data.append("location", JSON.stringify(listing.location));

  if (listing.oldImages && listing.oldImages.length > 0)
    data.append("oldImages", JSON.stringify(listing.oldImages));


  if (listing._id)
    return client.put(`${endpoint}/${listing._id}`, data, {
      onUploadProgress: (progress) =>
        onUploadProgress(progress.loaded / progress.total),
    });

  return client.post(endpoint, data, {
    onUploadProgress: (progress) =>
      onUploadProgress(progress.loaded / progress.total),
  });
};

export default {
  addListing,
  getListings,
  deleteListing,
};
