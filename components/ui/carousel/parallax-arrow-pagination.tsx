import {Dimensions, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import { renderItem } from "@/components/ui/SlideItem";
import Carousel, {
	ICarouselInstance,
} from "react-native-reanimated-carousel";
import { useRef } from "react";
import { Ionicons } from '@expo/vector-icons';

const colors = {
	light: "#bceeea", 
	dark: "#365d62",
}

export const ArrowPagination = () => {
	const progress = useSharedValue<number>(0);
	const ref = useRef<ICarouselInstance>(null);

	const paginate = (offset: number) => {
		ref.current?.scrollTo({
			count: offset,
			animated: true
		});
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={[styles.arrowButton, styles.leftArrow]}
				onPress={() => paginate(-1)}
				activeOpacity={0.9}
			>

					<Ionicons name="chevron-back" size={24} color={colors.dark} />

			</TouchableOpacity>

			<TouchableOpacity
				style={[styles.arrowButton, styles.rightArrow]}
				onPress={() => paginate(1)}
				activeOpacity={0.9}
			>

					<Ionicons name="chevron-forward" size={24} color={colors.dark} />

			</TouchableOpacity>

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
		</View>
	)
}

const styles = StyleSheet.create({
	container: {
		position: 'relative',
	},
	arrowButton: {
		position: 'absolute',
		zIndex: 100,
		backgroundColor: colors.light,
		width: 40,
		height: 40,
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 0.3,
		top: '50%',
		transform: [{ translateY: -20 }],
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	leftArrow: {
		left: 16,
	},
	rightArrow: {
		right: 16,
	}
});