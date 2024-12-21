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
      },
      $_get_move_out_rental_checklist: (id: any) => {
        let url = `/rental-applications/${id}/move-out-checklists`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_add_move_out_checklist_item: (id: string, payload: any) => {
        let url = `/rental-applications/${id}/move-out-checklists`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_create_move_out_notice: (payload: any) => {
        let url = `/move-out-notices`;
        return GATEWAY_ENDPOINT.post(url, payload);
      },
      $_get_billing_categories: () => {
        let url = `/billing-categories`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_billers_by_category: (id: any) => {
        let url = `billing-categories/${id}/billers`;
        return GATEWAY_ENDPOINT.get(url);
      },
      $_get_payitem_for_billers: (id: any) => {
        let url =  `billers/${id}/pay-items`
        return GATEWAY_ENDPOINT.get(url);
      }
}
