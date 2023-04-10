
export const loadToken = () => {
  try {
    const serializedState = localStorage.getItem('token');

    if (!serializedState) {
      return undefined;
    }

    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

export const saveToken = (token: string) => {
  try {
    const serializedState = JSON.stringify(token);

    localStorage.setItem('token', serializedState);
  } catch {
    // ignore write errors
  }
};
