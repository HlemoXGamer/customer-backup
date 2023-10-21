


export default async function ({ $axios, store, $auth }) {
     $axios.onRequest(() => {
          $axios.setToken($auth.strategy.token.get())
     })
     store.dispatch('cart/get');
}