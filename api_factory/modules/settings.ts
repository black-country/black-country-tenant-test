import { GATEWAY_ENDPOINT } from "../axios.config";

export const settings_api = {
      $_create_notification_preferences: (payload: any) => {
        const url = '/preferences/users';
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_fetch_notification_preferences: () => {
        const url = '/preferences/users';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_upcoming_activities: (id: any) => {
        const url = `/tenants/${id}/upcoming-activities`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_faq: () => {
        const url = '/faqs?app=tenant-app';
        return GATEWAY_ENDPOINT.get(url);
      },
      //
      $_fetch_terms_of_use: () => {
        const url = '/policies?app=tenant-app&name=terms of use&type=terms_of_use';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_fetch_privacy_policy: () => {
        const url = '/policies?app=tenant-app&name=privacy policy&type=privacy_policy';
        return GATEWAY_ENDPOINT.get(url);
      },
      $_create_preferences: (payload: any) => {
        const url = '/preferences/users';
        return GATEWAY_ENDPOINT.post(url, payload);
      },

};
