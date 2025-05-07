export const removeCookie = (name) => {
    const paths = ["/", "/api", window.location.pathname];
  
    paths.forEach((path) => {
      document.cookie = `${name}=; Path=${path}; Max-Age=0; SameSite=Lax;`;
    });
  
    // Optional: clear domain-wide too
    document.cookie = `${name}=; Path=/; Domain=${window.location.hostname}; Max-Age=0;`;
  };
  