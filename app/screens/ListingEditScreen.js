import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  View,
  Alert,
} from "react-native";
import * as Yup from "yup";

import categoriesApi from "../api/categories";
import {
  Form,
  FormField,
  FormPicker as Picker,
  SubmitButton,
} from "../components/forms";
import CategoryPickerItem from "../components/CategoryPickerItem";
import Screen from "../components/Screen";
import FormImagePicker from "../components/forms/FormImagePicker";
import listingsApi from "../api/listings";
import useLocation from "../hooks/useLocation";
import UploadScreen from "./UploadScreen";
import routes from "../navigation/routes";
import useAuth from "../auth/useAuth";
import ImageShow from "../components/ImageShow";

const validationSchema = Yup.object().shape({
  title: Yup.string().required().min(1).label("Title"),
  price: Yup.number().required().min(1).max(100000).label("Price"),
  description: Yup.string().label("Description"),
  category: Yup.object().required().nullable().label("Category"),
  // images: Yup.array().min(1, "Please select at least one image."),
});

function getString(image) {
  return image.url.substring(34, image.url.length - 9);
}

function ListingEditScreen({ route, navigation }) {
  const prevListing = route.params;
  const { user } = useAuth();
  const getCategoriesApi = useApi(categoriesApi.getCategories);
  const [uploadVisible, setUploadVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const [initialImages, setInitialImages] = useState(prevListing.images);

  useEffect(() => {
    getCategoriesApi.request();
  }, []);

  const handleSubmit = async (listing, { resetForm }) => {
    if (listing.images.length === 0 && initialImages.length === 0)
      return alert("Please select at least one image...");

    setProgress(0);
    setUploadVisible(true);

    const result = await listingsApi.addListing(
      {
        _id: prevListing._id,
        ...listing,
        oldImages: initialImages.map(getString),
        userId: user.userId,
      },
      (progress) => setProgress(progress)
    );

    resetForm();
    navigation.navigate(routes.LISTINGS);

    if (!result.ok) {
      setUploadVisible(false);
      return alert("Could not save the listing");
    }
  };

  const handleRemoveImage = (url) => {
    setInitialImages(initialImages.filter((image) => image.url !== url));
  };

  return (
    <Screen style={styles.container}>
      <KeyboardAvoidingView
        behavior="position"
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 100}
      >
        <UploadScreen
          onDone={() => setUploadVisible(false)}
          progress={progress}
          visible={uploadVisible}
        />

        <Form
          initialValues={{
            title: prevListing.title,
            price: prevListing.price.toString(),
            description: prevListing.description,
            category: prevListing.categoryId,
            images: [],
          }}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <View style={{ display: "flex", flexDirection: "row" }}>
            <ImageShow
              images={initialImages}
              onRemoveImage={handleRemoveImage}
            />

            <FormImagePicker name="images" count={initialImages.length} />
          </View>
          <FormField maxLength={255} name="title" placeholder="Title" />
          <FormField
            keyboardType="numeric"
            maxLength={8}
            name="price"
            placeholder="Price"
            width={120}
          />
          <Picker
            items={getCategoriesApi.data}
            name="category"
            numberOfColumns={3}
            PickerItemComponent={CategoryPickerItem}
            placeholder="Category"
            width="50%"
          />
          <FormField
            maxLength={255}
            multiline
            name="description"
            numberOfLines={3}
            placeholder="Description"
          />
          <SubmitButton title="Post" />
        </Form>
      </KeyboardAvoidingView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});
export default ListingEditScreen;
