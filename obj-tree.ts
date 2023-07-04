type TNodes<T> = Record<string, TNode<T>>;

type TNode<T> = {
  value?: any;
  nodes: TNodes<T>;
};

class TreeNode<T> {
  nodes: Record<string, TreeNode<T>>;
  value?: T;

  constructor(value?: T) {
    this.value = value;
    this.nodes = {};

    return this;
  }

  add(key: string, node: TreeNode<T>) {
    this.nodes[key] = node;

    return this;
  }

  remove(key: string) {
    delete this.nodes[key];

    return this;
  }

  find([key, ...keys]: string[]) {
    if (!key) {
      return this;
    }

    if (!this.nodes[key]) {
      throw new Error("not found");
    }

    return this.nodes[key].find(keys);
  }
}

export { TreeNode };
