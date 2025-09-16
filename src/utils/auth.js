export const getUserIdFromLocalStorage = () => {
  const auth_details = JSON.parse(
    localStorage.getItem("sb-pxscukkdtytvjvfookbm-auth-token")
  );
  if (auth_details && auth_details.user) {
    return auth_details.user.id;
  }
};
