import {Dimensions } from 'react-native';

import { useSharedValue } from 'react-native-reanimated';
import { renderItem } from "@/components/ui/SlideItem";
import Carousel, {
	ICarouselInstance,
	Pagination,
} from "react-native-reanimated-carousel";
import {Fragment, useRef} from "react";

const colors = {
	light: "#bceeea",
	dark: "#365d62",
}

export const ParallaxCarousel = () => {
	const progress = useSharedValue<number>(0);

	const ref = useRef<ICarouselInstance>(null);

	const onPressPagination = (index: number) => {
		ref.current?.scrollTo({
			/**
			 * Calculate the difference between the current index and the target index
			 * to ensure that the carousel scrolls to the nearest index
			 */
			count: index - progress.value,
			animated: true,
		});
	};

	return (
		<Fragment>
			<Carousel
				ref={ref}
				autoPlayInterval={1000}
				data={Array.from({ length: 6 }, (_, index) => index)}
				height={258}
				loop
				pagingEnabled
				snapEnabled
				width={Dimensions.get('window').width}
				style={{
					width: Dimensions.get('window').width,
				}}
				withAnimation={{
					type: "spring",
					config: {
						damping: 10,
						mass: 0.9,
						stiffness: 70,
					  }
				}}
				mode="parallax"
				modeConfig={{
					parallaxScrollingScale: 0.9,
					parallaxScrollingOffset: 50,
					parallaxAdjacentItemScale: 0.8,
				}}
				onProgressChange={progress}
				renderItem={renderItem({ rounded: true })}
			/>

			<Pagination.Basic
				progress={progress}
				data={Array.from({ length: 6 }, (_, index) => index)}
				dotStyle={{ backgroundColor: colors.light, borderRadius: 20 }}
				activeDotStyle={{ backgroundColor: colors.dark, borderRadius: 20}}
				containerStyle={{ gap: 5, marginBottom: 10 }}
				onPress={onPressPagination}
			/>
		</Fragment>
	)
}