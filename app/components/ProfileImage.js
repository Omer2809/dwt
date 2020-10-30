import React, { useState } from "react";
import ImageInput from "./ImageInput";
import usersApi from "../api/users";

function ProfileImage({ userId, styling }) {
  const [url, setUrl] = useState("");

  const handleAdd = async (uri) => {
    setUrl(uri);

    const result = await usersApi.updateImage(uri, userId);
    // const result1 = await usersApi.getUser(userId);
    // console.log(result1.data);
    if (!result.ok) {
      setUrl("");
      return alert("Could not update the profile");
    }
  };

  const handleRemove = async () => {
    let originalUrl = url;

    setUrl("");
    const result = await usersApi.deleteImage(userId);
    // console.log(result);

    if (!result.ok) {
      setUrl(originalUrl);
      return alert("Could not delete the profile");
    }
  };

  return (
    <>
      {url.length !== 0 ? (
        <ImageInput
          count={0}
          styling={styling}
          imageUri={url}
          onChangeImage={handleRemove}
        />
      ) : (
        <ImageInput
          // imageUri={uri}
          count={0}
          styling={styling}
          onChangeImage={handleAdd}
        />
      )}
    </>
  );
}

export default ProfileImage;
