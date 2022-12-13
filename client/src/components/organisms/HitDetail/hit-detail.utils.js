export function checkIsDisabledForUser(loggedUser) {
  let disabledProperties = {
    description: true,
    targetName: true,
    status: true,
    hitCreator: true,
    assignee: true,
  };
  if (loggedUser.type === 'hitman') {
    disabledProperties.status = false;
  }
  if (loggedUser.type === 'manager' || loggedUser.type === 'boss') {
    disabledProperties.assignee = false;
  }

  return disabledProperties;
}
