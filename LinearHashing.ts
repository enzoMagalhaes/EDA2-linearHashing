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

    this.bucketsCount = 2;
    this.elementsCount = 0;
  }

  private hash(value: number, level: number) {
    return value % (2 ** level * this.m);
  }

  private insertInBucket(index: number, value: number) {
    try {
      console.log(
        `INSERT index: ${index}, value: ${value} N: ${this.N} l: ${
          this.l
        } calculated: ${value % (2 ** this.l * this.m)}`
      );

      this.bucketsCount += this.buckets.get(index)!.insert(value);
    } catch {
      throw new Error(
        `INSERT index: ${index}, value: ${value} N: ${this.N} l: ${
          this.l
        } calculated: ${value % (2 ** this.l * this.m)}`
      );
    }
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
    console.log(`REORDER N: ${this.N} l: ${this.l}`);

    this.buckets.set(this.N + 2 ** this.l * this.m, new BucketList(this.p));
    this.bucketsCount++;

    const bucketList = this.buckets.get(this.N)!;
    let currentBucket: Bucket | null = bucketList.head;
    let movedKeys: number[] = [];
    while (currentBucket) {
      for (let i = 0; i < currentBucket.values.length; i++) {
        let newIndex = this.hash(currentBucket.values[i], this.l + 1);
        if (newIndex !== this.N) {
          this.insertInBucket(newIndex, currentBucket.values[i]);
          movedKeys.push(currentBucket.values[i]);
        }
      }
      currentBucket = currentBucket.next;
    }

    for (let i = 0; i < movedKeys.length; i++) {
      bucketList.remove(movedKeys[i]);
    }

    this.N++;
    if (this.N >= 2 ** (this.l + 1)) {
      this.l++;
      this.N = 0;
    }

    console.log(`REORDER FINISH`);
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

// const linearHashing = new LinearHashing(5, 0.8);
// const input: number[] = [
//   6511, 9703, 2351, 2455, 9618, 2513, 6440, 1763, 8341, 6606, 3174, 4927, 6967,
//   8203, 6699, 109, 2498, 7178, 5942, 1186, 573, 8011, 7402, 9020, 2721, 1320,
//   9266, 7291, 9307, 893, 4623, 8466, 3301, 5961, 3811, 8795, 2659, 3686, 9131,
//   4947, 5699, 9607, 2998, 9894, 6585, 8190, 7847, 2367, 7711, 7614, 8010, 3580,
//   2954, 9151, 6439, 5965, 815, 5813, 7333, 8808, 2100, 262, 6090, 4828, 7556,
//   5320, 8869, 8929, 8392, 5409, 9836, 9090, 9632, 2968, 6113, 6436, 8374, 2223,
//   6054, 8646, 9251, 726, 2773, 3011, 4205, 6011, 1285, 2196, 5811, 4083, 3902,
//   3038, 8062, 881, 2823, 2194, 7877, 4608, 3509, 8549, 8565, 9816, 2099, 8170,
//   9868, 5015, 4979, 3556, 173, 9176, 2228, 5025, 9358, 9029, 9298, 4185, 5686,
//   5639, 1125, 2947, 9386, 2949, 2954, 1651, 8778, 885, 149, 9482, 8156, 2396,
//   7500, 6600, 8143, 7384, 2140, 4656, 6786, 3726, 5888, 8455, 4034, 2278, 3307,
//   6215, 6209, 2528, 8221, 3340, 8759, 630, 5885, 3032, 4897, 8626, 1874, 2743,
//   6875, 1608, 9311, 8840, 2918, 3984, 9314, 1368, 6599, 7685, 3561, 1027, 3683,
//   7130, 8000, 3981, 2119, 2946, 6045, 2183, 84, 7005, 3425, 8561, 598, 116,
//   8077, 516, 3839, 4682, 2507, 8267, 2948, 9010, 4244, 57, 5834, 6202, 7636,
//   8721, 8335, 459, 1334, 9018, 4583, 5299, 3100, 6110, 5583, 4652, 6641, 5489,
//   6932, 2836, 1300, 9493, 6867, 1516, 6167, 17, 3263, 2888, 7518, 3805, 6557,
//   5663, 2907, 7517, 793, 6723, 6483, 6967, 3551, 2134, 8870, 2877, 296, 2756,
//   4287, 7265, 8213, 3996, 8003, 6823, 6249, 2050, 1755, 9922, 6777, 6506, 9192,
//   3794, 2613, 4041, 3375, 9254, 4190, 9577, 5807, 528, 3645, 6630, 7853, 7540,
//   2805, 2589, 7476, 4723, 1004, 8178, 4467, 299, 495, 6512, 886, 7517, 2954,
//   1164, 2710, 3784, 9067, 7882, 8646, 1787, 4900, 8997, 3104, 3605, 2247, 3765,
//   7711, 572, 9022, 7608, 6654, 8143, 7593, 3459, 8490, 6725, 1040, 4244, 5008,
//   9156, 431, 1318, 1184, 3620, 8436, 2189, 9188, 164, 3591, 9921, 2173, 488,
//   7697, 5057, 7729, 4041, 2824, 3335, 6743, 6829, 4767, 8912, 6510, 5504, 1523,
//   1951, 5649, 4781, 2354, 7419, 8791, 3198, 8825, 4953, 9608, 7399, 4251, 6098,
//   4158, 9319, 2371, 6011, 6074, 6131, 9462, 7145, 7222, 417, 5635, 5585, 3703,
//   3352, 9561, 299, 5884, 1025, 440, 8166, 9339, 4343, 3232, 5467, 1042, 1924
// ];

// for (let i = 0; i < input.length; i++) {
//   linearHashing.insert(input[i]);
// }

// linearHashing.print();

// linearHashing.insert(6444)
