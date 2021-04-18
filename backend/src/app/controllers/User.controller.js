const { User } = require("../models");
class UserController {
  async store(request, response) {
    // const data = request.only([
    //   'firstName',
    //   'lastName',
    //   'password',
    //   'email',
    // ]);
    // try {
    //   const user = await User.create(data)
    //   return response.created(user)
    // } catch (error) {
    //   await transaction.rollback()
    //   return response.internalServerError({ message: error.message })
    // }
    return response.status(200).send();
  }
}

module.exports = new UserController();
