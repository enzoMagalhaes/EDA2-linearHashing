export class Page {
  public previous: Page | null;
  public next: Page | null;
  public values: number[];
  constructor(m: number) {
    this.values = new Array(m);
    this.previous = null;
    this.next = null;
    this.values = [];
  }
}

export class PageList {
  public head: Page;
  private tail: Page;

  constructor(private p: number = 2) {
    const initialPage = new Page(this.p);
    this.head = initialPage;
    this.tail = initialPage;
  }

  public insert(value: number): number {
    let return_value; // returns 1 if a new Page is created, 0 otherwise

    // if tail is full, create a new Page in the list
    if (this.tail.values.length == this.p) {
      const newPage = new Page(this.p);
      this.tail.next = newPage;
      newPage.previous = this.tail;
      this.tail = newPage;

      return_value = 1;
    } else {
      return_value = 0;
    }

    this.tail.values.push(value);
    return return_value;
  }

  public print() {
    let response: string = "";
    let currentPage: Page | null = this.head;
    while (currentPage) {
      if (currentPage.next) {
        response += currentPage.values + " -> ";
      } else {
        response += currentPage.values;
      }
      currentPage = currentPage.next;
    }

    console.log(response);
  }
}
