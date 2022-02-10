function dbFields(fields) {
  const insert = Object.keys(fields)
    .map((key, index) => `"${key}"=$${index + 1}`)
    .join(', ');
  // then we can use: (${ insert }) in our string template

  // need something like $1, $2, $3
  const select = Object.keys(fields)
    .map((_, index) => `$${index + 1}`)
    .join(', ');
  // then we can use (${ select }) in our string template

  const vals = Object.values(fields);
  return { insert, select, vals };
}

// console.log(dbFields({ name: 'Austin', username: 'austy' }));

function requireUser(req, res, next) {
  if (!req.user) {
    next({
      name: 'MissingUserError',
      message: 'You must be logged in to perform this action',
    });
  }

  next();
}

function requireAdmin(req, res, next) {
  if (!req.user.isAdmin) {
    next({
      name: 'MissingAdminError',
      message: 'You must be an Admin in to perform this action',
    });
  }

  next();
}

module.exports = {
  dbFields,
  requireUser,
  requireAdmin,
};
