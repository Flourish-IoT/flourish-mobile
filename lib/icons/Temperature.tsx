import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Temperature({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='39' height='62' viewBox='0 0 39 62' fill='none' {...rest}>
			<Path
				d='M28.1791 34.1522L28.1685 8.21378C28.1832 7.14047 27.9845 6.07493 27.5839 5.07906C27.1834 4.08319 26.5889 3.17683 25.8351 2.41263C25.0813 1.64843 24.1832 1.04162 23.1929 0.627452C22.2026 0.21328 21.1399 0 20.0665 0C18.9931 0 17.9304 0.21328 16.9401 0.627452C15.9498 1.04162 15.0517 1.64843 14.2979 2.41263C13.5441 3.17683 12.9496 4.08319 12.5491 5.07906C12.1485 6.07493 11.9498 7.14047 11.9645 8.21378V34.1462C9.28323 35.8937 7.23824 38.4607 6.1342 41.4648C5.03017 44.4689 4.92617 47.7492 5.8377 50.8172C6.74923 53.8852 8.62751 56.5766 11.1927 58.4904C13.7579 60.4043 16.8728 61.4383 20.0733 61.4383C23.2739 61.4383 26.3887 60.4043 28.954 58.4904C31.5192 56.5766 33.3975 53.8852 34.309 50.8172C35.2205 47.7492 35.1165 44.4689 34.0125 41.4648C32.9084 38.4607 30.8635 35.8937 28.1822 34.1462L28.1791 34.1522ZM20.0673 58.4102C17.4526 58.4061 14.9126 57.5385 12.8419 55.9421C10.7711 54.3457 9.28577 52.11 8.61661 49.5825C7.94745 47.0549 8.13197 44.3771 9.1415 41.9653C10.151 39.5534 11.929 37.5425 14.1991 36.2453L14.9526 35.8145V34.9468V8.21226C14.9526 6.85658 15.4912 5.55643 16.4498 4.59782C17.4084 3.63922 18.7085 3.10068 20.0642 3.10068C21.4199 3.10068 22.72 3.63922 23.6786 4.59782C24.6373 5.55643 25.1758 6.85658 25.1758 8.21226V8.85463H21.766C21.4683 8.86547 21.1863 8.99137 20.9795 9.20586C20.7727 9.42035 20.6571 9.7067 20.6571 10.0047C20.6571 10.3026 20.7727 10.589 20.9795 10.8035C21.1863 11.0179 21.4683 11.1439 21.766 11.1547H25.1819V14.1793H21.766C21.4608 14.1793 21.1681 14.3006 20.9523 14.5164C20.7365 14.7322 20.6152 15.0249 20.6152 15.3301C20.6152 15.6353 20.7365 15.928 20.9523 16.1438C21.1681 16.3597 21.4608 16.4809 21.766 16.4809H25.1819V19.504H21.766C21.4683 19.5148 21.1863 19.6408 20.9795 19.8552C20.7727 20.0697 20.6571 20.3561 20.6571 20.654C20.6571 20.952 20.7727 21.2384 20.9795 21.4528C21.1863 21.6673 21.4683 21.7932 21.766 21.8041H25.1819V34.9468V35.8191L25.943 36.2453C28.2137 37.5429 29.9919 39.5544 31.0013 41.967C32.0107 44.3796 32.1947 47.0582 31.5245 49.5862C30.8544 52.1141 29.3677 54.3498 27.2957 55.9456C25.2237 57.5414 22.6825 58.4078 20.0673 58.4102Z'
				fill={fill}
			/>
			<Path
				d='M24.3987 38.946C23.6944 38.5438 23.1089 37.9625 22.7018 37.261C22.2946 36.5595 22.0802 35.7628 22.0804 34.9518L22.0697 26.4837C22.0697 26.2206 22.0179 25.9601 21.9172 25.7171C21.8166 25.4741 21.669 25.2532 21.483 25.0672C21.297 24.8812 21.0761 24.7336 20.8331 24.633C20.5901 24.5323 20.3296 24.4805 20.0665 24.4805C19.8034 24.4805 19.5429 24.5323 19.2999 24.633C19.0569 24.7336 18.836 24.8812 18.65 25.0672C18.464 25.2532 18.3164 25.4741 18.2158 25.7171C18.1151 25.9601 18.0633 26.2206 18.0633 26.4837V34.9472C18.0633 35.7589 17.8489 36.5561 17.4418 37.2583C17.0347 37.9605 16.4493 38.5427 15.745 38.946C14.0654 39.9014 12.7491 41.3855 12.0011 43.1671C11.253 44.9487 11.1154 46.9277 11.6095 48.7957C12.1036 50.6637 13.2018 52.3158 14.7328 53.4945C16.2639 54.6732 18.1419 55.3124 20.0741 55.3124C22.0064 55.3124 23.8843 54.6732 25.4154 53.4945C26.9465 52.3158 28.0446 50.6637 28.5387 48.7957C29.0329 46.9277 28.8952 44.9487 28.1472 43.1671C27.3992 41.3855 26.0828 39.9014 24.4033 38.946H24.3987Z'
				fill={fill}
			/>
			<Path
				d='M30.0198 36.6704C32.2915 36.2564 36.8009 33.9882 36.6645 28.2276'
				stroke={fill}
				stroke-width='2.5'
				stroke-linecap='round'
			/>
			<Path
				d='M33.4161 54.0438C35.4923 55.3233 36.2248 57.5207 36.469 60.2065'
				stroke={fill}
				stroke-width='2.5'
				stroke-linecap='round'
			/>
			<Path
				d='M7.0335 54.044C4.91755 55.3479 4.17106 57.5874 3.92222 60.3245'
				stroke={fill}
				stroke-width='2.5'
				stroke-linecap='round'
			/>
			<Path
				d='M8.60321 38.19C6.3315 37.776 1.82218 35.5078 1.95855 29.7472'
				stroke={fill}
				stroke-width='2.5'
				stroke-linecap='round'
			/>
		</Svg>
	);
}
