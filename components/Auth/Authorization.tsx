import { useSession, useSupabaseClient } from "@supabase/auth-helpers-react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { ReactNode } from "react";

export type AuthorizationProps = {
  children: ReactNode;
};

export const Authorization: React.FC<AuthorizationProps> = ({ children }) => {
  const session = useSession();
  const supabase = useSupabaseClient();
  return !session ? (
    <Auth
      supabaseClient={supabase}
      appearance={{ theme: ThemeSupa }}
      theme="dark"
      onlyThirdPartyProviders
      providers={["github"]}
    />
  ) : (
    <>{children}</>
  );
};
