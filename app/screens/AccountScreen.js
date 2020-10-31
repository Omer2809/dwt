import React, { useEffect } from "react";
import { StyleSheet, View, FlatList } from "react-native";

import { ListItem, ListItemSeparator } from "../components/lists";
import colors from "../config/colors";
import Icon from "../components/Icon";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import useAuth from "../auth/useAuth";
import useApi from "../hooks/useApi";
import usersApi from "../api/users";

const menuItems = [
  {
    title: "My Listings",
    icon: {
      name: "format-list-bulleted",
      backgroundColor: colors.primary,
    },
    targetScreen: routes.MY_LISTINGS,
  },
  {
    title: "My Messages",
    icon: {
      name: "email",
      backgroundColor: colors.secondary,
    },
    targetScreen: routes.MESSAGES,
  },
];

function AccountScreen({ navigation }) {
  const { user, logOut } = useAuth();
  const getUsersApi = useApi(usersApi.getUser);

  useEffect(() => {
    getUsersApi.request(user.userId);
  }, [getUsersApi.data]);

  return (
    <Screen style={styles.screen}>
      <View style={styles.container}>
        {getUsersApi.data.images && getUsersApi.data.images.length !== 0 ? (
          <ListItem
            title={user.name}
            subTitle={user.email}
            imageUrl={getUsersApi.data.images[0].url}
            thumbnailUrl={getUsersApi.data.images[0].thumbnailUrl}
          />
        ) : (
          <ListItem
            title={user.name}
            subTitle={user.email}
            IconComponent={
              <Icon
                name={"account-outline"}
                size={60}
                backgroundColor={colors.profile}
              />
            }
            // image={require("../assets/mosh.jpg")}
          />
        )}
      </View>
      <View style={styles.container}>
        <FlatList
          data={menuItems}
          keyExtractor={(menuItem) => menuItem.title}
          ItemSeparatorComponent={ListItemSeparator}
          renderItem={({ item }) => (
            <ListItem
              title={item.title}
              IconComponent={
                <Icon
                  name={item.icon.name}
                  backgroundColor={item.icon.backgroundColor}
                />
              }
              onPress={() => navigation.navigate(item.targetScreen)}
            />
          )}
        />
      </View>
      <ListItem
        title="Log Out"
        IconComponent={<Icon name="logout" backgroundColor="#ffe66d" />}
        onPress={() => logOut()}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.light,
  },
  container: {
    marginVertical: 20,
  },
});

export default AccountScreen;
