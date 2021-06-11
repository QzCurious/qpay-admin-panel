import { createI18n } from "vue-i18n/dist/vue-i18n.esm-bundler.js";

/**
 * Load locale messages
 *
 * The loaded `JSON` locale messages is pre-compiled by `@intlify/vue-i18n-loader`, which is integrated into `vue-cli-plugin-i18n`.
 * See: https://github.com/intlify/vue-i18n-loader#rocket-i18n-resource-pre-compilation
 */
function loadLocaleMessages() {
  const locales = require.context(
    "./locales",
    true,
    /[A-Za-z0-9-_,\s]+\.(json|js)$/i
  );
  const messages = {};
  locales.keys().forEach((key) => {
    const matched = key.match(/([A-Za-z0-9-_]+)\./i);
    if (matched && matched.length > 1) {
      const locale = matched[1];
      messages[locale] = locales(key).default;
    }
  });
  return messages;
}

function message_locale_filter(locales, message) {
  return Object.entries(message)
    .filter(([locale]) => locales.includes(locale))
    .reduce((acc, cur) => {
      acc[cur[0]] = cur[1];
      return acc;
    }, {});
}

const only_locales = process.env.VUE_APP_I18N_AVAILABLE_LOCALES.split(",");
const locale_message = loadLocaleMessages();

const i18n_config = createI18n({
  locale: process.env.VUE_APP_I18N_LOCALE || "en",
  fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || "en",
  messages: message_locale_filter(only_locales, locale_message),
});

export default i18n_config;
