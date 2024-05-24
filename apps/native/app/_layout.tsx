import { Stack } from "expo-router";
import React from "react";
import { Provider } from "@mrtrades/api/provider";

type Props = {};

const RootLayout = (props: Props) => {
  return (
    <Provider>
      <Stack />
    </Provider>
  );
};

export default RootLayout;
