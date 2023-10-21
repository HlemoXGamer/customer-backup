import { setClient } from '@/apis/_client';

function shouldNotToast (array, message) {
  for (let i = 0; i < array.length; i++) {
    if (Array.isArray(array[i]) && array[i].every( e => message?.includes(e))) {
      return true
    }
  }
}

const array_should_not = [
  ['checkout', 'api'],
  ['refresh'],
  ['cookie'],
  ['logout'],
  ['deliveryManLocation'],
  ['lat'],
  ['Unauthenticated']
]

export default function ({ $axios, app, $auth }) {
  $axios.onError((error) => {
    // alert(JSON.stringify(error, null, 4))
    let { message, errors } = error.response.data;

    errors = errors ? errors : {};

    // store.commit('SET_ERROR_BAG', errors);
    if (!shouldNotToast(array_should_not, message)) {
      app.$toast.error(message);
    }
    // setTimeout(() => {

    //      const firstError = document.querySelector('.error--text')

    //      if (firstError) [
    //           window.scroll({
    //                top: firstError.offsetTop,
    //                behavior: "smooth"
    //           })
    //      ]

    // }, 400)

    return Promise.reject(message);
  });

  $axios.onResponse((response) => {
    return response.data;
  });

  setClient($axios);
}


