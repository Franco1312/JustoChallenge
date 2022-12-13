export function getUsersToAssing(users, loggedUser) {
  if (loggedUser.type === 'manager') {
    return users.map((user) => {
      if (user.manager?.id === loggedUser.id && user.id !== loggedUser.id){

        return user.username
      }
    });
  }
  return users.map((user) => {
    if (user.isActive && user.id !== loggedUser.id) {
      return user.username;
    }
  });
}
