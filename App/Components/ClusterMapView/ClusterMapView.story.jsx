import { storiesOf } from "@storybook/react-native";
import * as React from "react";

import ClusterMapView from "./ClusterMapView";

storiesOf("ClusterMapView", module)
  .add("Default", () => (
    <ClusterMapView />
  ));