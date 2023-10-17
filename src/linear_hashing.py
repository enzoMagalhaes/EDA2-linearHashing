from math import ceil
from .page_list import PageList


class LinearHashing:
    def __init__(self, p=2, max_alpha=0.8, m=2):
        self.pages = {}
        self.N = 0
        self.l = 0
        self.elements_count = 0
        self.pages_count = 0
        self.p = p
        self.max_alpha = max_alpha
        self.m = m

        for i in range(self.m):
            self.pages[i] = PageList(self.p)

        self.pages_count = self.m
        self.elements_count = 0

    def hash(self, value, level):
        return value % (2**level * self.m)

    def insert_in_page(self, index, value):
        self.pages_count += self.pages[index].insert(value)

    def insert(self, value):
        index = self.hash(value, self.l)
        if index < self.N:
            index = self.hash(value, self.l + 1)

        self.insert_in_page(index, value)
        self.elements_count += 1

        while self.alpha > self.max_alpha:
            self.reorder()

    def reorder(self):
        self.pages[self.N + 2**self.l * self.m] = PageList(self.p)

        page_list = self.pages[self.N]
        current_page = page_list.head
        staying_keys = []
        keys_count = 0

        while current_page:
            for val in current_page.values:
                new_index = self.hash(val, self.l + 1)
                if new_index == self.N:
                    staying_keys.append(val)
                else:
                    self.pages[new_index].insert(val)
                keys_count += 1

            current_page = current_page.next

        self.pages_count += (
            ceil(max(len(staying_keys), 1) / self.p)
            + ceil(max(keys_count - len(staying_keys), 1) / self.p)
            - ceil(keys_count / self.p)
        )

        new_page_list = PageList(self.p)

        for key in staying_keys:
            new_page_list.insert(key)
        self.pages[self.N] = new_page_list

        self.N += 1
        if self.N >= 2 ** (self.l + 1):
            self.l += 1
            self.N = 0

    @property
    def alpha(self):
        return self.elements_count / (self.pages_count * self.p)

    @property
    def p_star(self):
        return self.pages_count / len(self.pages)

    def print(self):
        for i in range(len(self.pages)):
            print(f"Page {i}:")
            self.pages[i].print()
