import { ArrowUpIcon } from "@/components/ui/Icons";
import { Pressable, StyleSheet } from "react-native";

interface Props {
  onPress: () => void;
}

export default function ScrollTopButton(props: Props) {
  return (
    <Pressable
      style={({ pressed }) => [
        {
          backgroundColor: pressed ? "lightgray" : "white",
        },
        styles.button,
      ]}
      onPress={props.onPress}
    >
      <ArrowUpIcon />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9999,
    position: "absolute",
    bottom: 20,
    right: 20,
    padding: 12,
    elevation: 1,
  },
});
