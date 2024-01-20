import { createIntl } from "react-intl";
const en_us = require("../../i18n/translations/en.json");

export const intlStub = createIntl({ locale: "en-us", messages: en_us });
export const intlMessages = en_us;
