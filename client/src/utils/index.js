export const userRoles = ['boss', 'manager', 'hitman'];
export const hitStatus = ['Assigned', 'Failed', 'Completed'];

export function checkWhatUsersShow(users, loggedUser) {
  if (loggedUser.type === 'manager') {
    return users.filter((user) => {
      return user.manager?.id === loggedUser.id && user.type === 'hitman';
    });
  }
  return users.filter((user) => {
    return user.type === 'hitman';
  });
}
