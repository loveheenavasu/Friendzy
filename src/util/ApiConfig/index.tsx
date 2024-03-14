import axios from 'axios';

const firbaseInstance = axios.create({
  baseURL: 'https://fcm.googleapis.com/fcm/send',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Authorization:
      'key=AAAAygspTng:APA91bEgzumnBREPRfk3zcdHWLd6TALKqJWlVdpFY8U9fQmdARhsO73bMs30aY2Xf5vwQalNPnrzr1BdGKITVGhA2LZvGT7TzWXqrFWpxSi2lTsCD8M31BE5Xeh3fE1djLMN72Pr5YGO',
    // Authorization:
    //   'key=AAAAPTuXAZE:APA91bFWo2zMYQQXZalVQhLTWDohkyBQZGA2G0UCeiUFRwavUFEOyeJTeJFX9Zv6qxftg3MozATvWmvBNpn1QX1-1H3IEq-X_Q16lYFV2zuzrP9O2FNYfPbeahTsUScrr2_z7EPStbND',
    // Authorization:
    //   'key=AAAAygspTng:APA91bEgzumnBREPRfk3zcdHWLd6TALKqJWlVdpFY8U9fQmdARhsO73bMs30aY2Xf5vwQalNPnrzr1BdGKITVGhA2LZvGT7TzWXqrFWpxSi2lTsCD8M31BE5Xeh3fE1djLMN72Pr5YGO',
  },
});

// Add a request interceptor
firbaseInstance.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);

const postMethod = (pars: any): Promise<any> => {
  return new Promise((resolve, reject) => {
    
    firbaseInstance({
      method: 'POST',
      data: {
        to: pars?.token,
        data: {
          // body: `${pars.userName} like your photo`,
          // title: pars.name,
          title: pars.likeBack?`You got a match with ${pars.userName}`:`${pars.userName} like your profile`,
          type: 'Like',
        },
        notification: {
          // body: `${pars.userName}  like your photo`,
          // title: pars.name,
          title: pars.likeBack?`You got a match with ${pars.userName}`:`${pars.userName} like your profile`,
          type: 'Like',
        },
      },
    })
      .then(res => {
        resolve(res?.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export const postMessageNotification = (pars: any): Promise<any> => {
  
  return new Promise((resolve, reject) => {
    firbaseInstance({
      method: 'POST',
      data: {
        to: pars?.token,
        data: {
          title:`${pars?.msg?.senderName}`,
          body:  pars.msg.chatData[0].text,
          imageUrl: '',
          type: 'CHAT',
        },
        notification: {
          title:`${pars?.msg?.senderName}`,
          body:  pars.msg.chatData[0].text,
          imageUrl: '',
          type: 'CHAT',
        },
      },
    })
      .then(res => {
        resolve(res?.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};

export {postMethod};

const ApiConfig = {
  postMethod,
  postMessageNotification,
};

export default ApiConfig;
