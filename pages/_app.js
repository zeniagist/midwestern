import "bootstrap/dist/css/bootstrap.min.css";

import "../styles/global.scss";
import "../styles/navbar.scss";
import "../styles/index.scss";
import "../styles/contact.scss";

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
