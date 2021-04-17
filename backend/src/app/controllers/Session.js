class SessionController {
  async store(request, response) {
    return await response.status(200).send();
  }
}

module.exports = new SessionController();
