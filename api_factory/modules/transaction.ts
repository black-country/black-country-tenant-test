import { GATEWAY_ENDPOINT } from '../axios.config'
export const transaction_api = {
    $_get_transaction_details: (tenantId: any, transactionId: any) => {
        let url = `/tenants/${tenantId}/payments/${transactionId}`;
        return GATEWAY_ENDPOINT.get(url);
      }
}
