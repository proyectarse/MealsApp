import createStripe from 'stripe-client';
import { host } from '../../utils/env';

const stripe = createStripe(
	'pk_test_51J98o9Hmla3kUYWsPBn6ldfFhj773h00fYdazxvT0vlAhylPYXEhSTsdbNarIneM7aM1yMxalbyDnCQ8HsLRK14W00V1pv8FDx'
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount, name) => {
	return fetch(`${host}/pay`, {
		body: JSON.stringify({
			token,
			name,
			amount,
		}),
		method: 'POST',
	}).then((res) => {
		if (res.status > 200) {
			return Promise.reject(
				'something went wrong processing your payment'
			);
		}
		return res.json();
	});
};
