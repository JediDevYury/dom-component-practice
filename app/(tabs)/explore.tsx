import { ScrollView } from 'react-native';


import { ScaleFadeInOutCarousel } from '@/components/ui/carousel/scale-fade-in-out';
import { ParallaxCarousel } from '@/components/ui/carousel/parallax';
import { ArrowPaginationCarousel } from '@/components/ui/carousel/arrow-pagination';
import { ArrowPagination } from '@/components/ui/carousel/parallax-arrow-pagination';
export default function TabTwoScreen() {
	return (
		<ScrollView
			id="carousel-component"
			contentContainerStyle={{
				paddingVertical: 20,
				gap: 10,
			}}
		>
			<ScaleFadeInOutCarousel />
			<ParallaxCarousel />
			<ArrowPaginationCarousel />
			<ArrowPagination />
		</ScrollView>
  );
}
