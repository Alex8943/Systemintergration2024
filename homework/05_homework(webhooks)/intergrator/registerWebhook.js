import axios from 'axios';


const registerWebhook = async (exposee_url, registrationData) => {
    try {
        const response = await axios.post(`${exposee_url}/webhooks/register`, registrationData);
        console.log('Webhook registered successfully:', response.data.message);
    } catch (error) {
        if (error.response && error.response.data && error.response.data.error) {
            console.error('Failed to register webhook:', error.response.data.error);
        }
    }
}

export default registerWebhook;