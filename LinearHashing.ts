import { PageList, Page } from "./PageList";

export default class LinearHashing {
  private pages: Map<number, PageList>;
  private N: number = 0;
  private l: number = 0;
  public elementsCount: number;
  public pagesCount: number;
  constructor(
    private p: number = 2,
    private maxAlpha: number = 0.8,
    private m: number = 2
  ) {
    this.pages = new Map<number, PageList>();
    for (let i = 0; i < this.m; i++) {
      this.pages.set(i, new PageList(this.p));
    }

    this.pagesCount = this.m;
    this.elementsCount = 0;
  }

  private hash(value: number, level: number) {
    return value % (2 ** level * this.m);
  }

  private insertInPage(index: number, value: number) {
    this.pagesCount += this.pages.get(index)!.insert(value);
  }

  public insert(value: number) {
    let index = this.hash(value, this.l);
    if (index < this.N) {
      index = this.hash(value, this.l + 1);
    }

    this.insertInPage(index, value);
    this.elementsCount++;

    while (this.alpha > this.maxAlpha) {
      this.reorder();
    }
  }

  private reorder() {
    this.pages.set(this.N + 2 ** this.l * this.m, new PageList(this.p));

    const pageList = this.pages.get(this.N)!;
    let currentPage: Page | null = pageList.head;
    let stayingKeys: number[] = [];
    let keysCount: number = 0;
    while (currentPage) {
      for (let i = 0; i < currentPage.values.length; i++) {
        let newIndex = this.hash(currentPage.values[i], this.l + 1);
        if (newIndex == this.N) {
          stayingKeys.push(currentPage.values[i]);
        } else {
          this.pages.get(newIndex)!.insert(currentPage.values[i]);
        }
        keysCount++;
      }
      currentPage = currentPage.next;
    }

    // count the number of pages added in total after reordering (this will always be either 1 or 0)
    this.pagesCount +=
      Math.ceil(Math.max(stayingKeys.length, 1) / this.p) +
      Math.ceil(Math.max(keysCount - stayingKeys.length, 1) / this.p) -
      Math.ceil(keysCount / this.p);

    const newPageList = new PageList(this.p);
    for (let i = 0; i < stayingKeys.length; i++) {
      newPageList.insert(stayingKeys[i]);
    }
    this.pages.set(this.N, newPageList);

    this.N++;
    if (this.N >= 2 ** (this.l + 1)) {
      this.l++;
      this.N = 0;
    }
  }

  public get alpha():number{
    return this.elementsCount / (this.pagesCount * this.p)
  }

  public get pStar(){
    return this.pagesCount / this.pages.size
  }

  public print() {
    for (let i = 0; i < this.pages.size; i++) {
      console.log(`Page ${i}: `);
      this.pages.get(i)!.print();
    }
  }
}

// const linearHashing = new LinearHashing(2, 0.8);
// linearHashing.insert(16)
// linearHashing.insert(15)
// linearHashing.insert(20)
// linearHashing.insert(36)
// linearHashing.insert(48)
// linearHashing.insert(40)
// linearHashing.insert(64)
// linearHashing.insert(88)
// linearHashing.insert(96)
// linearHashing.insert(3)
// linearHashing.print();

// const linearHashing = new LinearHashing(2, 0.8);
// linearHashing.insert(8);
// linearHashing.insert(11);
// linearHashing.insert(10);
// linearHashing.insert(15);
// linearHashing.insert(17);
// linearHashing.insert(25);
// linearHashing.insert(44);
// linearHashing.insert(12)

// linearHashing.print();

// const linearHashing = new LinearHashing(2, 0.8);
// linearHashing.insert(8);
// linearHashing.insert(17);
// linearHashing.insert(25);
// linearHashing.insert(10);
// linearHashing.insert(11);
// linearHashing.insert(15);
// linearHashing.insert(44);
// linearHashing.insert(12);
// linearHashing.insert(22);
// linearHashing.insert(37);
// linearHashing.insert(30);
// linearHashing.insert(21);

// linearHashing.print();
