import Vue from 'vue';
import Vuelidate from 'vuelidate';
import { validationMessage, validationMessages } from 'vuelidate-messages';
import { helpers } from 'vuelidate/lib/validators';

Vue.use(Vuelidate);

const i18n = {
  en: {
    required: 'Required',
    email: 'Wrong email format',
    numeric: 'Numbers Only',
    phoneValid: 'Invalid phone number',
    sameAs: (as) => `Does not match with ${as}`
  },
  ar: {
    required: 'مطلوب',
    email: 'البريد الإلكتروني غير صحيح',
    numeric: 'أرقام فقط',
    phoneValid: 'رقم الهاتف غير صحيح',
    sameAs: (as) => `لا يتطابق مع ${as}`
  },
}

export default ({ $validationMsgs, $validationMsg, store }, inject) => {
  const msgs = {
    required: ({ $params }) => {
      return i18n[getLocale($params)].required
    },
    requiredIf: ({ $params }) => {
      return i18n[getLocale($params)].required
    },
    email: ({ $params }) => {
      return i18n[getLocale($params)].email;
    },
    numeric: ({$params}) => {
      return i18n[getLocale($params)].numeric;
    },
    url: () => "Wrong url format ex.http://xxx.com",
    phoneValid: ({$params}) => {
      return i18n[getLocale($params)].phoneValid;
    },
    maxValue: ({ $params }) => `Max value is ${$params.maxValue.max}`,
    minValue: ({ $params }) => `Min value is ${$params.minValue.min}`,
    minLength: ({ $params }) =>
      `Min length is ${$params.minLength.min} characters`,
    between: ({ $params }) =>
      `Number Range from ${$params.between.min} to ${$params.between.max} is required `,
    // sameAs: ({ $params }) => `Does not match with ${$params.sameAs.eq}`,
    sameAs: ({ $params }) => i18n[getLocale($params)].sameAs($params.sameAs.eq) ,
    server: ({ $params }) => {
      const errors = store.state.serverErrorBag[$params.server.name];

      return errors ? errors[0] : "Invalid";
    },
  };

  const validationMsg = validationMessage(msgs);
  const validationMsgs = validationMessages(msgs);

  inject("validationMsgs", validationMsgs);
  inject("validationMsg", validationMsg);

  $validationMsgs = validationMsgs;
  $validationMsg = validationMsg;

  Vue.prototype.serverError = (name) => {
    return helpers.withParams({ name }, (value, vm) => {
      return !(name in store.state.serverErrorBag);
    });
  };
};


function getLocale(params) {
  const isLang = Object.values(params).find(e => e?.lang)
  if (isLang) {
    return isLang.lang
  }else {
    return 'en'
  }
  // return Object.values(params).find(e => e.lang) || 'en'
}