from pytest_bdd import scenario, given, when, then, scenarios

from pages.home import HomePage
from pages.about import AboutPage


def test_home_page_1(base_url, page):
    hp = HomePage(page)
    hp.page.goto(base_url)
    hp.validate_title()
    hp.visit_about_page()

    np = AboutPage(page)
    np.validate_text()


scenarios("about_page.feature")  # must()


@scenario('about_page.feature', 'User can navigate about page from homepage')
def scenario_presentation():
    print("running bdd scenario")


@given('User on home page')
def open_home_page(base_url, page):
    hp = HomePage(page)
    hp.page.goto(base_url)


@when('He clicks on about page')
def click_about_page(page):
    hp = HomePage(page)
    hp.visit_about_page()


@then('He is redirected to about page')
def check_redirect(page):
    hp = AboutPage(page)
    hp.validate_text()
