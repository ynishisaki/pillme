import {
  CancelIcon,
  DropIcon,
  PillIcon,
  QuestionIcon,
} from "@/components/ui/Icons";
import { Colors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, View } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";

type Props = {
  textComponent?: React.ReactNode;
  type: "medicine" | "bleeding";
  isChecked: boolean;
  isRestPeriod: boolean;
  isNotRecorded?: boolean;
  readonly?: boolean;
  onPress: (nextBoolean: boolean) => void;
};

export default function CheckBox(props: Props) {
  const ImageComponent = () => {
    if (props.isRestPeriod) {
      return <CancelIcon />;
    }
    if (props.isNotRecorded) {
      return <QuestionIcon />;
    }
    if (props.type === "medicine") {
      return <PillIcon />;
    }
    if (props.type === "bleeding") {
      return <DropIcon />;
    }
  };

  const fillColor = () => {
    if (props.isRestPeriod) {
      return Colors.checkbox.unpressable;
    }
    if (props.isNotRecorded) {
      return Colors.checkbox.unpressableUnknown;
    }
    return Colors.checkbox.fill;
  };

  return (
    <View style={styles.container}>
      {props.textComponent}
      <BouncyCheckbox
        size={100}
        innerIconStyle={{
          borderWidth: 2,
        }}
        iconStyle={{
          elevation: 1,
        }}
        ImageComponent={ImageComponent}
        fillColor={fillColor()}
        unFillColor={Colors.checkbox.unfill}
        isChecked={
          props.isRestPeriod || props.isNotRecorded ? true : props.isChecked
        }
        onPress={props.onPress}
        disableText={true}
        disabled={props.isRestPeriod || props.isNotRecorded || props.readonly}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
