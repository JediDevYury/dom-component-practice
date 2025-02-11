import React, { useMemo } from "react";
import {
  type StyleProp,
  StyleSheet,
  Text,
  View,
  type ViewProps,
  Image,
  ViewStyle,
} from "react-native";
import type { AnimatedProps, AnimatedStyle } from "react-native-reanimated";
import Animated from "react-native-reanimated";
import { CarouselRenderItem } from "react-native-reanimated-carousel";

interface CardContent {
  title: string;
  description: string;
  backgroundColor: string;
  image: any; // Consider using a more specific type like ImageSourcePropType
}

const CARD_CONTENTS: CardContent[] = [
  {
    title: "Welcome",
    description: "Get started with our amazing app",
    backgroundColor: "#ffffff",
    image: require("@/assets/images/slide-images/purple-0.png"), // Add your image paths
  },
  {
    title: "Discover",
    description: "Explore new possibilities",
    backgroundColor: "#ffffff", //
    image: require("@/assets/images/slide-images/purple-1.png"),
  },
  {
    title: "Connect",
    description: "Join our community today",
    backgroundColor: "#ffffff", // Pink
    image: require("@/assets/images/slide-images/purple-2.png"),
  },
];

type SlideItemProps = AnimatedProps<ViewProps> & {
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
  index: number; // Made required
  rounded?: boolean;
  testID?: string; // Added explicit testID prop
}

interface Options {
  rounded?: boolean;
  style?: StyleProp<AnimatedStyle<StyleProp<ViewStyle>>>;
}

const Card = ({ title, description, backgroundColor, image }: CardContent) => (
  <View style={styles.card}>
    <Image source={image} style={styles.image} resizeMode="cover" />
    <View style={[styles.textContainer, { backgroundColor: backgroundColor + 'CC' }]}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardDescription}>{description}</Text>
    </View>
  </View>
);

export const SlideItem= ({ 
  style, 
  index, 
  rounded = false, 
  testID, 
  ...animatedViewProps 
}: SlideItemProps) => {
  const cardContent = useMemo(
    () => CARD_CONTENTS[index % CARD_CONTENTS.length],
    [index]
  );

  //@ts-ignore
  return (
    <Animated.View testID={testID} style={{ flex: 1 }} {...animatedViewProps}>
      <View style={[style as StyleProp<ViewStyle>, styles.container, rounded && { borderRadius: 15 }]}>
        <Card {...cardContent} />
      </View>
    </Animated.View>
  );
};

export const renderItem = ({
  rounded = false,
  style,
}: Options = {}): CarouselRenderItem<number> => // Specified generic type
  ({ index }) => (
    <SlideItem 
      key={index} 
      index={index} 
      rounded={rounded} 
      style={style} 
    />
  );

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  card: {
    flex: 1,
    borderRadius: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  textContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "black",
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 16,
    color: "black",
    opacity: 0.9,
  },
});