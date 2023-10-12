import { BucketList, Bucket } from "./Bucket";

class LinearHashing {
  private buckets: BucketList[] = [];
  private N: number = 0;
  private l: number = 0;
  public elementsCount: number;
  public bucketsCount: number;
  constructor(private m: number = 2, private alpha: number = 0.8) {
    this.buckets.push(new BucketList(this.m), new BucketList(this.m));
    this.bucketsCount = 2;
    this.elementsCount = 0;
  }

  private hash(value: number, level: number) {
    return value % (2 ** level * this.m);
  }

  private insertInBucket(index: number, value: number) {
    this.bucketsCount += this.buckets[index].insert(value);
  }

  public insert(value: number) {
    let index = this.hash(value, this.l);
    if (index < this.N) {
      index = this.hash(value, this.l + 1);
    }

    this.insertInBucket(index, value);
    this.elementsCount++;

    while (this.elementsCount / (this.bucketsCount * this.m) > this.alpha) {
      this.reorder();
    }
  }

  public remove() {}

  private reorder() {
    this.buckets.push(new BucketList(this.m));
    this.bucketsCount++;

    const bucketList = this.buckets[this.N];
    let currentBucket: Bucket | null = bucketList.head;
    while (currentBucket) {
      let movedIndexes: number[] = [];

      for (let i = 0; i < currentBucket.values.length; i++) {
        let newIndex = this.hash(currentBucket.values[i], this.l + 1);
        if (newIndex !== this.N) {
          this.insertInBucket(newIndex, currentBucket.values[i]);
          movedIndexes.push(i);
        }
      }

      for (let i = 0; i < movedIndexes.length; i++) {
        bucketList.remove(currentBucket, movedIndexes[i]);
      }

      currentBucket = currentBucket.next;
    }

    this.N++;
    if (this.N == 2 ** (this.l + 1)) {
      this.l++;
      this.N = 0;
    }
  }

  public print() {
    for (let i = 0; i < this.buckets.length; i++) {
      console.log(`bucket ${i}: `);
      this.buckets[i].print();
    }
  }
}

const linearHashing = new LinearHashing(2,0.8);

linearHashing.insert(16)
linearHashing.insert(15)
linearHashing.insert(20)
linearHashing.insert(36)
linearHashing.insert(48)
linearHashing.insert(40)
linearHashing.insert(64)
linearHashing.insert(88)
linearHashing.insert(96)
linearHashing.insert(3)


// linearHashing.insert(1);
// linearHashing.insert(2);
// linearHashing.insert(3);
// linearHashing.insert(4);
// linearHashing.insert(5);
// linearHashing.insert(6);
// linearHashing.insert(7);
// linearHashing.insert(8);
linearHashing.print();
