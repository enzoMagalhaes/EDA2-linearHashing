class Page:
    def __init__(self, m):
        self.m = m
        self.previous = None
        self.next = None
        self.values = []


class PageList:
    def __init__(self, p):
        self.p = p
        initial_page = Page(p)
        self.head = initial_page
        self.tail = initial_page
        self.page_count = 1

    def insert(self, value):
        return_value = 0

        if len(self.tail.values) == self.p:
            new_page = Page(self.p)
            self.tail.next = new_page
            new_page.previous = self.tail
            self.tail = new_page

            self.page_count += 1
            return_value = 1

        self.tail.values.append(value)
        return return_value

    def search(self, k):
        current_page = self.head
        access_counter = 0
        while current_page:
            access_counter += 1
            for value in current_page.values:
                if value == k:
                    return (value, access_counter)
            current_page = current_page.next

        return (-1, access_counter)

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
