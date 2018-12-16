import { storiesOf } from "@storybook/react-native";
import * as React from "react";

import ClusterMarker from "./ClusterMarker";

storiesOf("ClusterMarker", module)
  .add("Default", () => (
    <ClusterMarker />
  ));