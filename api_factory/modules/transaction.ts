import { GATEWAY_ENDPOINT } from '../axios.config'
export const transaction_api = {
    $_get_transaction_details: (transactionId: any) => {
        let url = `/transaction/${transactionId}`;
        return GATEWAY_ENDPOINT.get(url);
      }
}
