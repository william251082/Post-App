export const parseApiErrors = (error) => {
  return error.response.body.violations.reduce(
      (parsedErrors, violation) => {
          parsedErrors[violation['propertyPath']] = violation['message'];
          return parsedErrors;
      }
  )
};


export const hydraPageCount = (collection) => {
    if (!collection['hydra:view']) {
        return 1;
    }

    return Number(
        collection['hydra:view']['hydra:last'].match(/page=(\d+)/)[1]
    )
};

const canWritePostRoles = ['ROLE_WRITER', 'ROLE_ADMIN', 'ROLE_SUPER_ADMIN'];

export const canWritePost = (userData) => {
    return null !== userData && userData.roles.some(
        userRoles => canWritePostRoles.includes(userRoles)
    );
};
