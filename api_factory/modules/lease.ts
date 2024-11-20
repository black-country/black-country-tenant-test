import { GATEWAY_ENDPOINT } from '../axios.config'
export const lease_api = {
    $_sign_lease_agreement: (agreementId: string | number, payload: any) => {
        let url = `/lease-agreements/${agreementId}/signed`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
      $_reject_lease_agreement: (agreementId: string | number, payload: any) => {
        let url = `/lease-agreements/${agreementId}/reject`;
        return GATEWAY_ENDPOINT.patch(url, payload);
      },
}
