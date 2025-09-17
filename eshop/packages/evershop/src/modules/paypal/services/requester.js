import axios from 'axios';
import { getConfig } from '../../../lib/util/getConfig.js';
import { getSetting } from '../../setting/services/setting.js';
import { getApiBaseUrl } from './getApiBaseUrl.js';

export async function createAxiosInstance(request) {
  const axiosInstance = axios.create({
    baseURL: await getApiBaseUrl(),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  axiosInstance.interceptors.request.use(async (config) => {
    const tokenObj = request.app.locals.paypalAccessToken; // {access_token: , expires_in: , created_at: }
    const now = new Date().getTime();
    if (!tokenObj || now - tokenObj.created_at > tokenObj.expires_in * 1000) {
      const paypalAccessToken = await requestAccessToken();
      request.app.locals.paypalAccessToken = {
        access_token: paypalAccessToken.data.access_token,
        expires_in: paypalAccessToken.data.expires_in,
        created_at: new Date().getTime()
      };

      config.headers.Authorization = `Bearer ${paypalAccessToken.data.access_token}`;
    } else {
      config.headers.Authorization = `Bearer ${tokenObj.access_token}`;
    }
    return config;
  });
  return axiosInstance;
}

async function requestAccessToken() {
  const paypalConfig = getConfig('system.paypal', {});
  let clientId;
  let clientSecret;
  if (paypalConfig.clientSecret) {
    clientSecret = paypalConfig.clientSecret;
  } else {
    clientSecret = await getSetting('paypalClientSecret', '');
  }

  if (paypalConfig.clientId) {
    clientId = paypalConfig.clientId;
  } else {
    clientId = await getSetting('paypalClientId', '');
  }

  const params = new URLSearchParams({ grant_type: 'client_credentials' });
  // Get paypal access token using Axios
  const paypalAccessToken = await axios.post(
    `${await getApiBaseUrl()}/v1/oauth2/token`,
    params,
    {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${Buffer.from(
          `${clientId}:${clientSecret}`
        ).toString('base64')}`
      }
    }
  );
  return paypalAccessToken;
}
