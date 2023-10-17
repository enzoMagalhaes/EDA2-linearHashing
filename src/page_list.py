class Page:
    def __init__(self, m):
        self.previous = None
        self.next = None
        self.values = []

class PageList:
    def __init__(self, p=2):
        self.p = p
        initial_page = Page(p)
        self.head = initial_page
        self.tail = initial_page

    def insert(self, value):
        return_value = -1

        if len(self.tail.values) == self.p:
            new_page = Page(self.p)
            self.tail.next = new_page
            new_page.previous = self.tail
            self.tail = new_page

            return_value = 1
        else:
            return_value = 0

        self.tail.values.append(value)
        return return_value

    def print(self):
        response = ""
        current_page = self.head
        while current_page:
            if current_page.next:
                response += str(current_page.values) + " -> "
            else:
                response += str(current_page.values)
            current_page = current_page.next
        print(response)