export class Bucket {
  public previous: Bucket | null;
  public next: Bucket | null;
  public values: number[];
  constructor(m: number) {
    this.values = new Array(m);
    this.previous = null;
    this.next = null;
    this.values = [];
  }
}

export class BucketList {
  public head: Bucket;
  private tail: Bucket;

  constructor(private p: number = 2) {
    const initialBucket = new Bucket(this.p);
    this.head = initialBucket;
    this.tail = initialBucket;
  }

  public insert(value: number): number {
    let return_value; // returns 1 if a new bucket is created, 0 otherwise

    // if tail is full, create a new Bucket in the list
    if (this.tail.values.length == this.p) {
      const newBucket = new Bucket(this.p);
      this.tail.next = newBucket;
      newBucket.previous = this.tail;
      this.tail = newBucket;

      return_value = 1;
    } else {
      return_value = 0;
    }

    this.tail.values.push(value);
    return return_value;
  }

  public print() {
    let response: string = "";
    let currentBucket: Bucket | null = this.head;
    while (currentBucket) {
      if (currentBucket.next) {
        response += currentBucket.values + " -> ";
      } else {
        response += currentBucket.values;
      }
      currentBucket = currentBucket.next;
    }

    console.log(response);
  }
}

// const list = new BucketList();

// list.insert(2);
// list.insert(4);

// list.insert(1);
// list.insert(3);

// list.print();
