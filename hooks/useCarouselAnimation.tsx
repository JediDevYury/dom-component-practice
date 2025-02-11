import { interpolate, Extrapolation } from 'react-native-reanimated';

export const useAnimationStyle = () => {
  const animationStyle = (value: number) => {
	  "worklet"

    return {
      transform: [{
        scale: interpolate(
          value,
          [-.5, 0, .5],
          [1, 0.9, 0.25],
          Extrapolation.CLAMP
        )
      }],
      zIndex: interpolate(
        value,
        [-1, 0, 1],
        [10, 20, 30],
		Extrapolation.CLAMP
      ),
      opacity: interpolate(
        value,
        [-0.75, 0, 1],
        [0, 1, 0],
		Extrapolation.CLAMP
      )
    };
  };

  return animationStyle;
};