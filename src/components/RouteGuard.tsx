"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { routes, protectedRoutes } from "@/resources";
import { Flex, Spinner, Button, Heading, Column, PasswordInput } from "@once-ui-system/core";
import NotFound from "@/app/not-found";

interface RouteGuardProps {
  children: React.ReactNode;
}

// Route checks run synchronously during render so public pages are fully
// server-rendered (no client-only spinner). Only password-protected routes
// need an async check, and only those show a loading state.
function isRouteEnabled(pathname: string | null): boolean {
  if (!pathname) return false;

  if (pathname in routes) {
    return routes[pathname as keyof typeof routes];
  }

  const dynamicRoutes = ["/blog", "/work"] as const;
  return dynamicRoutes.some((route) => pathname.startsWith(route) && routes[route]);
}

const RouteGuard: React.FC<RouteGuardProps> = ({ children }) => {
  const pathname = usePathname();
  const enabled = isRouteEnabled(pathname);
  const isPasswordRequired = Boolean(
    pathname && protectedRoutes[pathname as keyof typeof protectedRoutes],
  );

  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(isPasswordRequired);
  const [error, setError] = useState<string | undefined>(undefined);

  useEffect(() => {
    if (!isPasswordRequired) {
      setCheckingAuth(false);
      return;
    }

    let cancelled = false;
    setCheckingAuth(true);
    setIsAuthenticated(false);

    fetch("/api/check-auth")
      .then((response) => {
        if (!cancelled && response.ok) setIsAuthenticated(true);
      })
      .finally(() => {
        if (!cancelled) setCheckingAuth(false);
      });

    return () => {
      cancelled = true;
    };
  }, [pathname, isPasswordRequired]);

  const handlePasswordSubmit = async () => {
    const response = await fetch("/api/authenticate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (response.ok) {
      setIsAuthenticated(true);
      setError(undefined);
    } else {
      setError("Incorrect password");
    }
  };

  if (!enabled) {
    return <NotFound />;
  }

  if (isPasswordRequired && checkingAuth) {
    return (
      <Flex fillWidth paddingY="128" horizontal="center">
        <Spinner />
      </Flex>
    );
  }

  if (isPasswordRequired && !isAuthenticated) {
    return (
      <Column paddingY="128" maxWidth={24} gap="24" center>
        <Heading align="center" wrap="balance">
          This page is password protected
        </Heading>
        <Column fillWidth gap="8" horizontal="center">
          <PasswordInput
            id="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            errorMessage={error}
          />
          <Button onClick={handlePasswordSubmit}>Submit</Button>
        </Column>
      </Column>
    );
  }

  return <>{children}</>;
};

export { RouteGuard };
