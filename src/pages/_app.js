import "@/styles/globals.css";
import AuthProvider from "./api/auth/AuthContext";
import SidebarProvider from "./context/sidebarConetxt";

export default function App({ Component, pageProps }) {
  return (
    <AuthProvider>
      <SidebarProvider>
        <Component {...pageProps} />
      </SidebarProvider>
    </AuthProvider>
  );
}
