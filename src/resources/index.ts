// import a pre-defined template for config and content options
// we no longer expose `home` since the root route has been
// detached; refer to `/about` as the homepage instead.
export {
  person,
  social,
  newsletter,
  // home,
  about,
  blog,
  work,
  gallery,
} from "./content";

export {
  display,
  mailchimp,
  routes,
  protectedRoutes,
  baseURL,
  fonts,
  style,
  schema,
  sameAs,
  socialSharing,
  effects,
  dataStyle,
} from "./once-ui.config";
