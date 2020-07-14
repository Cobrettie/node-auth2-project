function restrict() {
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials"
    }

    try {
      null;
    } catch (err) {
      next(err)
    }
  }
}

module.exports = restrict