import {ThemeProvider as NextThemesProvider} from "next-themes";
import {AuthProvider} from "@/lib/auth-client";

const Providers = ({children}: {children: React.ReactNode}) => {
  return (
    <>
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <AuthProvider>{children}</AuthProvider>
      </NextThemesProvider>
    </>
  );
};

export default Providers;
