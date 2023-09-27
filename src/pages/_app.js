import "@/styles/globals.css";
import AuthProvider from "./api/auth/AuthContext";
import SidebarProvider from "./context/sidebarContext";
import LinkProvider from "./context/linkContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <LinkProvider>
        <Component {...pageProps} />
        </LinkProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
