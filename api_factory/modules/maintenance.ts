import { GATEWAY_ENDPOINT } from '../axios.config'
export const maintenance_api = {
	$_create_maintenence_request: (houseId: string, payload: any) => {
		const url = `/houses/${houseId}/maintenance-requests`
		return GATEWAY_ENDPOINT.post(url, payload)
	},
    $_fetch_maitenence_request: (page = 1, perPage = 20, status = 'pending', tenantId = '', houseId = '') => {
        let url = `/maintenance-requests?page=${page}&perPage=${perPage}&status=${status}`
        
    
           // Add search query to the URL if provided
           if (tenantId) {
            url += `&tenantId=${tenantId}`
        }

           // Add search query to the URL if provided
           if (houseId) {
            url += `&houseId=${houseId}`
        }
    
      
        return GATEWAY_ENDPOINT.get(url)
      },
      
      $_cancel_maintenence_request: (id: string) => {
		const url = `/maintenance-requests/${id}/cancelled`
		return GATEWAY_ENDPOINT.patch(url)
	},
    $_confirm_maintenence_request: (id: string, payload: any) => {
		const url = `maintenance-requests/${id}/confirmed`
		return GATEWAY_ENDPOINT.patch(url, payload)
	},
    $_initiate_move_in: () => {
		const url = '/move-in/initiate'
		return GATEWAY_ENDPOINT.post(url)
	},
    $_verify_move_in: (applicationId: any, payload: any) => {
		const url = `/rental-applications/${applicationId}/move-in`
		return GATEWAY_ENDPOINT.post(url, payload)
	},
	$_get_my_home: () => {
        let url = '/my-home'
        return GATEWAY_ENDPOINT.get(url);
      }
}