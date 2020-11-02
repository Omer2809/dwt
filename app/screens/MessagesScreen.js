import React, { useState, useEffect } from "react";
import { FlatList, View } from "react-native";

import myApi from "../api/my";
import Screen from "../components/Screen";
import Text from "../components/Text";
import Button from "../components/Button";
import {
  ListItem,
  ListItemDeleteAction,
  ListItemSeparator,
} from "../components/lists";
import routes from "../navigation/routes";
import messagesApi from "../api/messages";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";

function MessagesScreen({ navigation }) {
  const getMyMessagesApi = useApi(myApi.getMyMessages);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    getMyMessagesApi.request();
    setRefreshing(false);
    const unsubscribe = navigation.addListener("focus", () => {
      setRefreshing(true);
    });

    setRefreshing(false);
    return unsubscribe;
  }, [refreshing]);

  const handleDelete = async (message) => {
    const originalData = getMyMessagesApi.data;
    const messages = originalData.filter((l) => l._id !== message._id);
    getMyMessagesApi.setData(messages);

    const result = await messagesApi.deleteMessage(message._id);

    if (!result.ok) {
      getMyMessagesApi.setData(originalData);
      return alert("Could not delete the message");
    }
  };

  return (
    <>
      <ActivityIndicator visible={getMyMessagesApi.loading} />
      <Screen>
        {getMyMessagesApi.error && (
          <View
            style={{
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              height: 200,
            }}
          >
            <AppText>Couldn't retrieve the Messages.</AppText>
            <Button title="Retry" onPress={getMyMessagesApi.request} />
          </View>
        )}
        {getMyMessagesApi.data.length === 0 ? (
          <Text style={{ paddingLeft: 20 }}>
            You Don't have Any messages Yet...
          </Text>
        ) : (
          <>
            <Text
              style={{ paddingLeft: 20, color: "#669900", marginBottom: 10 }}
            >
              You got {getMyMessagesApi.data.length} messages ...
            </Text>
            <FlatList
              data={getMyMessagesApi.data}
              keyExtractor={(message) => message._id}
              renderItem={({ item }) => (
                <ListItem
                  title={item.fromUser && item.fromUser.name}
                  subTitle={item.content}
                  imageUrl={
                    item.fromUser.images[0] && item.fromUser.images[0].url
                  }
                  thumbnailUrl={
                    item.fromUser.images[0] &&
                    item.fromUser.images[0].thumbnailUrl
                  }
                  onPress={() =>
                    navigation.navigate(routes.MESSAGE_DETAILS, item)
                  }
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
                  )}
                />
              )}
              ItemSeparatorComponent={ListItemSeparator}
              refreshing={refreshing}
              onRefresh={() => setRefreshing(true)}
            />
          </>
        )}
      </Screen>
    </>
  );
}

export default MessagesScreen;
