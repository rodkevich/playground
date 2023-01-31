from playwright.sync_api import Page


class AboutPage:
    text: str = 'This is an about page'
    message: str = '.about > h1:nth-child(1)'

    def __init__(self, page: Page):
        self.page = page

    def validate_text(self):
        assert self.page.locator(self.message).text_content() == self.text
