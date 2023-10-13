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
      if (this.next) {
        this.previous!.next = this.next;
      } else {
        this.previous.next = null;
      }
    }

    return value;
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
    let return_value;
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

  public remove(value: number) {
    let currentBucket: Bucket | null = this.head;
    while (currentBucket) {
      for (let i = 0; i < currentBucket.values.length; i++) {
        if (currentBucket.values[i] == value) {
          
          if (currentBucket != this.tail || i != currentBucket.values.length - 1) {
            currentBucket.values[i] = this.tail.pop()!;

            if (this.tail.values.length == 0) {
              this.tail = this.tail.previous!;
            }
          } else {
            this.tail.pop();
          }

          break;
        }
      }
      currentBucket = currentBucket.next;
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




const list = new BucketList(5);

list.insert(7750);
list.insert(5308);
list.insert(7590);
list.insert(5508);

list.print();

list.remove(7750);
list.print();
list.remove(7590);

list.print();


