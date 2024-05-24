import {
  RefreshControl,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect } from "react";
import { trpc } from "@mrtrades/api/client";

type Props = {};

const HomePage = (props: Props) => {
  const {
    data,
    error,
    isLoading,
    trpc: t,
    refetch,
    isRefetching,
  } = trpc.userList.useQuery();

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} />
      }
    >
      <Text>HomePage</Text>
      {data?.map((user) => <Text key={user.id}>{user.email}</Text>)}
    </ScrollView>
  );
};

export default HomePage;

const styles = StyleSheet.create({});
