let Node = function () {
  this.key = null;
  this.value = null;
  this.nextNode = null;
};

let LinkedList = function () {
  this.root = null;

  this.append = function (key, value) {
    if (this.root == null) {
      this.root = new Node();
      this.root.key = key;
      this.root.value = value;
    } else {
      let tempNode = this.root;
      while (tempNode.nextNode != null) {
        tempNode = tempNode.nextNode;
      }
      tempNode.nextNode = new Node();
      tempNode.nextNode.key = key;
      tempNode.nextNode.value = value;
    }
  };

  this.prepend = function (key, value) {
    const tempNode = this.root;
    this.root = new Node();
    this.root.key = key;
    this.root.value = value;
    this.root.nextNode = tempNode;
  };

  this.size = function () {
    let size = 0;
    let tempNode = this.root;
    while (tempNode != null) {
      size++;
      tempNode = tempNode.nextNode;
    }
    return size;
  };

  this.head = function () {
    return this.root;
  };

  this.tail = function () {
    let tempNode = this.root;
    while (tempNode.nextNode != null) {
      tempNode = tempNode.nextNode;
    }
    return tempNode;
  };

  this.at = function (index) {
    let size = 0;
    let tempNode = this.root;
    while (tempNode != null && size < index) {
      size++;
      tempNode = tempNode.nextNode;
    }
    if (size == index && tempNode != null) {
      return tempNode;
    } else {
      return 'Out of Bounds';
    }
  };

  this.insertAt = function (key, value, index) {
    let size = 0;
    let nextNode = this.root;
    let prevNode = null;
    while (nextNode != null && size < index) {
      size++;
      prevNode = nextNode;
      nextNode = nextNode.nextNode;
    }
    if (size == index && nextNode != null) {
      //return tempNode;
      let newNode = new Node();
      newNode.key = key;
      newNode.value = value;
      if (prevNode != null) {
        prevNode.nextNode = newNode;
      } else {
        this.root = newNode;
      }
      newNode.nextNode = nextNode;
    } else {
      return 'Out of Bounds';
    }
  };

  this.removeAt = function (index) {
    let size = 0;
    let tempNode = this.root;
    let prevNode = null;
    while (tempNode != null && size < index) {
      size++;
      prevNode = tempNode;
      tempNode = tempNode.nextNode;
    }
    if (size == index && tempNode != null) {
      //return tempNode;
      if (prevNode != null) {
        prevNode.nextNode = tempNode.nextNode;
      } else {
        this.root = tempNode.nextNode;
      }
    } else {
      return 'Out of Bounds';
    }
  };

  this.replaceAt = function (key, value, index) {
    let size = 0;
    let nextNode = this.root;
    while (nextNode != null && size < index) {
      size++;
      nextNode = nextNode.nextNode;
    }
    if (size == index && nextNode != null) {
      //return tempNode;
      nextNode.key = key;
      nextNode.value = value;
    } else {
      return 'Out of Bounds';
    }
  };

  this.pop = function () {
    if (this.root == null) {
      return 'Empty list';
    } else if (this.root.nextNode == null) {
      let returnNode = this.root;
      this.root = null;
      return returnNode;
    } else {
      let tempNode = this.root;
      let prevNode = null;
      while (tempNode.nextNode != null) {
        prevNode = tempNode;
        tempNode = tempNode.nextNode;
      }
      prevNode.nextNode = null;
      return tempNode;
    }
  };

  this.contains = function (key) {
    let tempNode = this.root;
    if (tempNode.key == key) {
      return true;
    } else {
      while (tempNode.nextNode != null) {
        tempNode = tempNode.nextNode;
        if (tempNode.key == key) {
          return true;
        }
      }
    }
    return false;
  };

  this.find = function (key) {
    let index = 0;
    let tempNode = this.root;
    if (tempNode.key == key) {
      return index;
    } else {
      while (tempNode.nextNode != null) {
        tempNode = tempNode.nextNode;
        index++;
        if (tempNode.key == key) {
          return index;
        }
      }
    }
    return null;
  };

  this.toString = function () {
    let tempNode = this.root;

    if (tempNode != null) {
      console.log(`( ${tempNode.key} )`);
    }
    while (tempNode.nextNode != null) {
      tempNode = tempNode.nextNode;
      console.log(`=> ( ${tempNode.key} )`);
    }
  };
};

let HashMap = function () {
  this.loadFactor = 0.8;
  this.capacity = 16;
  this.buckets = [];

  this.hash = function (key) {
    let hashCode = 0;

    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = primeNumber * hashCode + key.charCodeAt(i);
    }

    return hashCode;
  };

  this.calcBucket = function (hash) {
    return hash % this.capacity;
  };

  this.set = function (key, value) {
    const hashNo = this.hash(key);
    let existingKeyIndex = null;
    const bucketIndex = this.calcBucket(hashNo);
    if (
      this.buckets[bucketIndex] == undefined ||
      this.buckets[bucketIndex] == null
    ) {
      this.buckets[bucketIndex] = new LinkedList();
    } else {
      existingKeyIndex = this.buckets[bucketIndex].find(key);
    }
    if (existingKeyIndex != null) {
      this.buckets[bucketIndex].replaceAt(key, value, existingKeyIndex);
    } else {
      this.buckets[bucketIndex].append(key, value);
    }
  };

  this.get = function (key) {
    const hashNo = this.hash(key);
    let existingKeyIndex = null;
    const bucketIndex = this.calcBucket(hashNo);
    if (
      this.buckets[bucketIndex] == undefined ||
      this.buckets[bucketIndex] == null
    ) {
      return null;
    } else {
      existingKeyIndex = this.buckets[bucketIndex].find(key);
      if (existingKeyIndex != null){
        return this.buckets[bucketIndex].at(existingKeyIndex).value;
      }else{
        return null;
      }
    }
  };
};

hm = new HashMap();
hm.set('apple', 'red');
hm.set('apple', 'yellow');
console.log();
