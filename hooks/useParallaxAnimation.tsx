import { interpolate } from 'react-native-reanimated';
import type { SharedValue } from 'react-native-reanimated';

interface ParallaxAnimationProps {
  scrollOffset: SharedValue<number>;
  headerHeight: number;
}

export const useParallaxAnimation = ({ scrollOffset, headerHeight }: ParallaxAnimationProps) => {
  const headerAnimatedStyle = () => {
	"worklet"
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [-headerHeight / 2, 0, headerHeight * 0.75]
          ),
        },
        {
          scale: interpolate(
            scrollOffset.value,
            [-headerHeight, 0, headerHeight],
            [2, 1, 1]
          ),
        },
      ],
    };
  };

  return headerAnimatedStyle;
};