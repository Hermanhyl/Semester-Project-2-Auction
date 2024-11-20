export default async function router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await import("./views/home.js");
        break;
      case "/auth/":
        await import("./views/auth.js");
        break;
        case "/profile/":
      await import("./views/profile.js");
      break;
      case "/post/create/":
      await import("./views/postCreate.js");
      break;
    }
  }