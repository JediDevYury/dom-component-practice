import {Pressable, StyleSheet} from "react-native";
import DeviceInfo, {DialogRef} from "@/components/dom-components/DeviceInfo";
import * as Device from "expo-device";
import {useRef, useState} from "react";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 0,
    paddingVertical: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  }
})

export default function DevicePage() {
  const getDeviceInfo = () => {
    return {
      ...Device
    }
  }

  const ref = useRef<DialogRef>(null);

  const [containerSize, setContainerSize] = useState<{
    width: number;
    height: number;
  } | null>(null);

  return (
    <Pressable
      onLongPress={() => {
        ref.current?.closeModal();
      }}
      style={styles.container}
    >
      <DeviceInfo
        ref={ref}
        dom={{
          matchContents: false,
          style: {
            margin: 0,
            padding: 0,
          }
        }}
        device={getDeviceInfo()}
        onDOMLayout={async ({width, height}) => {
          if (containerSize?.width !== width || containerSize?.height !== height) {
            setContainerSize({width, height});
          }
        }}
      />
    </Pressable>
  )
}