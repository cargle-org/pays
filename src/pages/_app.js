import "@/styles/globals.css";
import AuthProvider from "./api/auth/AuthContext";
import SidebarProvider from "./context/sidebarContext";
import UserProvider from "./context/userContext";
import LinkProvider from "./context/linkContext";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
      <UserProvider>
        <LinkProvider>
        <Component {...pageProps} />
        </LinkProvider>
      </UserProvider>
      </SidebarProvider>
    </AuthProvider>
  );
}
