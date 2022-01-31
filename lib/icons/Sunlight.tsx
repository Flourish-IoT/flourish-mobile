import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

export default function Sunlight({ fill = 'black', ...rest }: SvgProps) {
	return (
		<Svg width='59' height='59' viewBox='0 0 59 59' fill='none' {...rest}>
			<Path
				d='M0 29.4722C0 28.8062 0.222222 28.2234 0.694444 27.7516C1.16667 27.3076 1.75 27.0856 2.36111 27.0856H8.02778C8.66667 27.0856 9.19444 27.3076 9.63889 27.7794C10.0556 28.2512 10.2778 28.8062 10.2778 29.4722C10.2778 30.1383 10.0833 30.6933 9.66667 31.1651C9.25 31.6369 8.69444 31.8589 8.05556 31.8589H2.38889C1.75 31.8589 1.19445 31.6369 0.722223 31.1651C0.250001 30.6933 0 30.1383 0 29.4722ZM7.94444 48.7041C7.94444 48.0658 8.16667 47.5108 8.58333 47.0113L12.6667 43.0428C13.0833 42.5988 13.6389 42.4045 14.3056 42.4045C14.9722 42.4045 15.5278 42.6265 15.9722 43.0428C16.4167 43.4591 16.6389 43.9864 16.6389 44.6246C16.6389 45.2907 16.4167 45.9012 15.9722 46.4007L12.0278 50.3415C10.8889 51.2295 9.75 51.2295 8.61111 50.3415C8.16667 49.8975 7.94444 49.3424 7.94444 48.7041ZM7.94444 10.2959C7.94444 9.65757 8.16667 9.10254 8.58333 8.60301C9.13889 8.13123 9.72222 7.90922 10.3611 7.90922C10.9722 7.90922 11.5278 8.13123 12 8.57526L15.9722 12.6548C16.4167 13.071 16.6389 13.6261 16.6389 14.2921C16.6389 14.9581 16.4167 15.5132 15.9722 15.9572C15.5278 16.4012 14.9722 16.6232 14.3056 16.6232C13.6389 16.6232 13.0833 16.4012 12.6667 15.9572L8.61111 11.9887C8.16667 11.5447 7.94444 10.9619 7.94444 10.2959ZM15.0278 29.4722C15.0278 26.8913 15.6667 24.477 16.9722 22.2568C18.2778 20.0367 20.0278 18.2606 22.2778 16.9563C24.5278 15.6519 26.9167 15.0136 29.5 15.0136C31.4444 15.0136 33.3056 15.4022 35.1111 16.1792C36.8889 16.9563 38.4444 17.9831 39.7222 19.2874C41.0278 20.5917 42.0556 22.1181 42.8056 23.8942C43.5556 25.6703 43.9444 27.5574 43.9444 29.5C43.9444 32.1087 43.3056 34.523 42 36.7432C40.6944 38.9633 38.9444 40.7117 36.7222 42.016C34.5 43.3203 32.0833 43.9586 29.4722 43.9586C26.8611 43.9586 24.4444 43.3203 22.2222 42.016C20 40.7117 18.25 38.9633 16.9444 36.7432C15.6944 34.4953 15.0278 32.0809 15.0278 29.4722ZM19.75 29.4722C19.75 32.1919 20.6944 34.4953 22.6111 36.4102C24.5 38.325 26.8056 39.2963 29.5278 39.2963C32.25 39.2963 34.5556 38.325 36.4722 36.4102C38.3889 34.4953 39.3611 32.1919 39.3611 29.4722C39.3611 26.8081 38.3889 24.5325 36.4722 22.6176C34.5556 20.7305 32.25 19.7869 29.5278 19.7869C26.8333 19.7869 24.5278 20.7305 22.6389 22.6176C20.6944 24.5325 19.75 26.8081 19.75 29.4722ZM27.1389 51.063C27.1389 50.397 27.3611 49.842 27.8333 49.3979C28.3056 48.9539 28.8611 48.7319 29.5 48.7319C30.1667 48.7319 30.75 48.9539 31.1944 49.3979C31.6389 49.842 31.8611 50.397 31.8611 51.063V56.5856C31.8611 57.2516 31.6389 57.8344 31.1667 58.3062C30.6944 58.778 30.1389 59 29.5 59C28.8611 59 28.2778 58.778 27.8333 58.3062C27.3611 57.8344 27.1389 57.2516 27.1389 56.5856V51.063ZM27.1389 8.04798V2.38664C27.1389 1.74835 27.3611 1.19332 27.8333 0.721543C28.3056 0.249765 28.8611 0 29.5278 0C30.1944 0 30.7222 0.222013 31.1944 0.693791C31.6667 1.16557 31.8889 1.7206 31.8889 2.35889V8.04798C31.8889 8.68627 31.6667 9.21355 31.1944 9.65757C30.7222 10.1016 30.1667 10.2959 29.5278 10.2959C28.8889 10.2959 28.3056 10.0738 27.8611 9.65757C27.4167 9.2413 27.1389 8.68627 27.1389 8.04798ZM42.4722 44.6246C42.4722 43.9864 42.6944 43.4591 43.1111 43.0706C43.5278 42.6265 44.0556 42.4323 44.6667 42.4323C45.3333 42.4323 45.8889 42.6543 46.3333 43.0706L50.3889 47.039C50.8333 47.5108 51.0556 48.0936 51.0556 48.7319C51.0556 49.3702 50.8333 49.9252 50.3889 50.3692C49.2778 51.2295 48.1667 51.2295 47.0555 50.3692L43.1111 46.4285C42.6944 45.929 42.4722 45.3462 42.4722 44.6246ZM42.4722 14.3198C42.4722 13.6261 42.6944 13.071 43.1111 12.6825L47.0555 8.60301C47.5278 8.15898 48.0833 7.93697 48.6944 7.93697C49.3611 7.93697 49.9167 8.15898 50.3611 8.63076C50.8333 9.10254 51.0556 9.65757 51.0556 10.2959C51.0556 10.9897 50.8333 11.5724 50.3889 12.0165L46.3333 15.9849C45.8333 16.429 45.2778 16.651 44.6667 16.651C44.0278 16.651 43.5278 16.429 43.1111 15.9849C42.6944 15.5409 42.4722 14.9859 42.4722 14.3198ZM48.75 29.4722C48.75 28.8062 48.9722 28.2512 49.4167 27.7516C49.8611 27.3076 50.3889 27.0856 51 27.0856H56.6111C57.25 27.0856 57.8056 27.3354 58.2778 27.8071C58.75 28.2789 59 28.834 59 29.4722C59 30.1105 58.75 30.6656 58.2778 31.1373C57.8056 31.6091 57.25 31.8311 56.6111 31.8311H51C50.3611 31.8311 49.8055 31.6091 49.3889 31.1373C48.9722 30.6656 48.75 30.1383 48.75 29.4722Z'
				fill={fill}
			/>
		</Svg>
	);
}
