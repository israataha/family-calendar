import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { Agenda } from "react-native-calendars";

export default function Calendar() {
  return (
    <View style={styles.container}>
      <Agenda />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
