import { BucketList, Bucket } from "./Bucket";

export default class LinearHashing {
  private buckets: Map<number, BucketList>;
  private N: number = 0;
  private l: number = 0;
  public elementsCount: number;
  public bucketsCount: number;
  constructor(
    private p: number = 2,
    private alpha: number = 0.8,
    private m: number = 2
  ) {
    this.buckets = new Map<number, BucketList>();
    for (let i = 0; i < this.m; i++) {
      this.buckets.set(i, new BucketList(this.p));
    }

    this.bucketsCount = this.m;
    this.elementsCount = 0;
  }

  private hash(value: number, level: number) {
    return value % (2 ** level * this.m);
  }

  private insertInBucket(index: number, value: number) {
    this.bucketsCount += this.buckets.get(index)!.insert(value);
  }

  public insert(value: number) {
    let index = this.hash(value, this.l);
    if (index < this.N) {
      index = this.hash(value, this.l + 1);
    }

    this.insertInBucket(index, value);
    this.elementsCount++;

    while (this.elementsCount / (this.bucketsCount * this.p) > this.alpha) {
      this.reorder();
    }
  }

  public remove() {}

  private reorder() {
    this.buckets.set(this.N + 2 ** this.l * this.m, new BucketList(this.p));
    this.bucketsCount++;

    const bucketList = this.buckets.get(this.N)!;
    let currentBucket: Bucket | null = bucketList.head;
    let stayingKeys: number[] = [];
    while (currentBucket) {
      for (let i = 0; i < currentBucket.values.length; i++) {
        let newIndex = this.hash(currentBucket.values[i], this.l + 1);
        if (newIndex == this.N) {
          stayingKeys.push(currentBucket.values[i]);
        } else {
          this.buckets.get(newIndex)!.insert(currentBucket.values[i]);
        }
      }
      currentBucket = currentBucket.next;
    }

    const newBucketList = new BucketList(this.p);
    for (let i = 0; i < stayingKeys.length; i++) {
      newBucketList.insert(stayingKeys[i]);
    }
    this.buckets.set(this.N, newBucketList);

    this.N++;
    if (this.N >= 2 ** (this.l + 1)) {
      this.l++;
      this.N = 0;
    }
  }

  public print() {
    for (let i = 0; i < this.buckets.size; i++) {
      console.log(`bucket ${i}: `);
      this.buckets.get(i)!.print();
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
