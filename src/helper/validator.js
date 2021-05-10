import moment from "moment";
import { helpers } from "@vuelidate/validators";

export function ipv4(value) {
  return /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(
    value
  );
}

export const date = (format = "YYYY/M/D") => ( value ) => {
  return !helpers.req(value) || moment(value, format, true).isValid();
};
