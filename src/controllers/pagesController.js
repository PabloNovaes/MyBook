export class PagesController {
  async homePage(req, res) {
    res.render("pages/homePage/index");
  }
  async categoryPage(req, res) {
    const category = req.params.category
    res.render("pages/categoryPage/index", { category });
  }
  async productPage(req, res) {
    res.render("pages/productPage/index");
  }
  async chatPage(req, res) {
    res.render("pages/chatPage/index");
  }
  async paymentPage(req, res) {
    res.render("pages/paymentPage/index");
  }
  async loginPage(req, res) {
    res.render("pages/login/index");
  }
  async registerPage(req, res) {
    res.render("pages/register/index");
  }
  async profilePage(req, res) {
    res.render("pages/profile/index");
  }
  async feedPage(req, res) {
    res.render("pages/feedPage/index");
  }
  async userProfile(req, res) {
    res.render("pages/userProfile/index");
  }
}
