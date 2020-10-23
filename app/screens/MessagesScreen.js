import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, View } from "react-native";

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
import ListItemEditAction from "../components/lists/ListItemEditAction";
import ActivityIndicator from "../components/ActivityIndicator";
import AppText from "../components/Text";

function MyListingsScreen({ navigation }) {
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
          <>
            <AppText>Couldn't retrieve the Messages.</AppText>
            <Button title="Retry" onPress={getMyMessagesApi.request} />
          </>
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
                  title={item.toUser && item.toUser.name}
                  subTitle={item.content}
                  image={require("../assets/mosh.jpg")}
                  onPress={() =>
                    navigation.navigate(routes.MESSAGE_DETAILS, item)
                  }
                  // thumbnailUrl={item.images[0].thumbnailUrl}
                  renderRightActions={() => (
                    <ListItemDeleteAction onPress={() => handleDelete(item)} />
                  )}
                  renderLeftActions={() => (
                    <ListItemEditAction
                      onPress={() =>
                        navigation.navigate(routes.LISTING_EDIT, item)
                      }
                    />
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

const styles = StyleSheet.create({});

export default MyListingsScreen;
