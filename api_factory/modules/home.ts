import { GATEWAY_ENDPOINT } from '../axios.config'
export const home_api = {
    $_fetch_checklist: () => {
        let url = `/checklists`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_add_checklist_item: (id: string, payload: any) => {
        let url = `/rental-applications/${id}/checklists`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_get_rental_checklist: (id: any) => {
        let url = `/rental-applications/${id}/checklists`;
        return GATEWAY_ENDPOINT.get(url);
      }
}
