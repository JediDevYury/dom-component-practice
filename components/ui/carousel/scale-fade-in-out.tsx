import {Dimensions, View } from 'react-native';

import { Extrapolation, interpolate, useSharedValue, Easing, ReduceMotion } from 'react-native-reanimated';
import { renderItem } from "@/components/ui/SlideItem";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import {Fragment, useRef } from "react";
import { useAnimationStyle } from '@/hooks/useCarouselAnimation';

const colors = {
	main: "#365d62",    // Dark color as main
	tint: "#bceeea",    // Light color as tint
}

const defaultDataWith6Colors = Array.from({ length: 6 }, (_) => colors.tint);

export const ScaleFadeInOutCarousel = () => {
	const progress = useSharedValue<number>(0);

	const ref = useRef<ICarouselInstance>(null);
	const animationStyle = useAnimationStyle();
	const baseOptions = {
		vertical: false,
		width: Dimensions.get('window').width,
		height: Dimensions.get('window').width * 0.6,
	} as const;

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: Math.round(index - progress.value),
			animated: true,
		});
	};

	return (
		<Fragment>
			<Carousel
				ref={ref}
				// autoPlayInterval={1000}
				data={Array.from({ length: 6 }, (_, index) => index)}
				{...baseOptions}
				style={{
					width: Dimensions.get('window').width,
				}}
				withAnimation={{
					type: 'timing',
					config: {
						duration: 500,
						easing: Easing.inOut(Easing.quad),
						reduceMotion: ReduceMotion.System,
					}
				}}
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
				}}
				onSnapToItem={onPressPagination}
				customAnimation={animationStyle}
				onProgressChange={progress}
				renderItem={renderItem({ rounded: true })}
			/>
			<Pagination.Custom<{color: string}>
				progress={progress}
				data={defaultDataWith6Colors.map((color) => ({ color }))}
				size={16}
				dotStyle={{
					borderRadius: 8,
					backgroundColor: colors.main,
					borderWidth: 1,
					borderColor: colors.main,
				}}
				activeDotStyle={{
					borderRadius: 10,
					width: 20,
					height: 20,
					backgroundColor: colors.tint,
					borderColor: colors.main,
				}}
				containerStyle={{
					gap: 8,
					alignItems: "center",
					height: 24,
				}}
				horizontal
				onPress={onPressPagination}
				customReanimatedStyle={(progress, index, length) => {
					let val = Math.abs(progress - index);
					if (index === 0 && progress > length - 1) {
						val = Math.abs(progress - length);
					}
 
					return {
						transform: [
							{
								scale: interpolate(
									val,
									[.3, 1],
									[1, 0.8],
									Extrapolation.CLAMP,
								),
							},
						],
						borderColor: `rgba(255, 255, 255, ${interpolate(
							val,
							[0, 1],
							[0.8, 0],
							Extrapolation.CLAMP,
						)})`,
					};
				}}
				renderItem={(item) => (
					<View
						style={{
							backgroundColor: item.color,
							flex: 1,
							borderRadius: 8,
						}}
					/>
				)}
			/>	
		</Fragment>
	)
}