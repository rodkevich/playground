from playwright.sync_api import Page


class HomePage:
    title: str = 'test-app'
    about_page_link: str = '#app > nav:nth-child(1) > a:nth-child(2)'

    def __init__(self, page: Page):
        self.page = page

    def validate_title(self):
        assert self.page.title() == self.title

    def visit_about_page(self):
        with self.page.expect_navigation():
            self.page.click(self.about_page_link)
