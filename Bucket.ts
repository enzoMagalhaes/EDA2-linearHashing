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

  public pop() {
    const value = this.values.pop();
    if (this.values.length == 0 && this.previous) {
      this.previous!.next = this.next;
    }

    return value;
  }
}

export class BucketList {
  public head: Bucket;
  private tail: Bucket;

  constructor(private m: number = 2) {
    const initialBucket = new Bucket(this.m);
    this.head = initialBucket;
    this.tail = initialBucket;
  }

  public insert(value: number): number {
    let return_value;
    // if tail is full, create a new Bucket in the list
    if (this.tail.values.length == this.m) {
      const newBucket = new Bucket(this.m);
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

  public remove(bucket: Bucket, index: number) {
    if (bucket != this.tail || index != this.m - 1) {
      bucket.values[index] = this.tail.pop()!;
    } else {
      this.tail.pop();
    }
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

// list.remove(list.head, 1);
// // list.remove(list.head, 1);

// list.print();
