type TNodes<T> = Record<string, TNode<T>>;

type TNode<T> = {
  value?: any;
  nodes: TNodes<T>;
};

type TTree<T> = TNode<T>;

const makeNode = <T>(value?: T, nodes: TNodes<T> = {}): TNode<T> => {
  return { value, nodes };
};

const makeTree = makeNode;

const addNode = <T>(tree: TTree<T>, key: string, node: TNode<T>): TTree<T> => ({
  ...tree,
  nodes: { ...tree.nodes, [key]: node },
});

const findNode = <T>(tree: TTree<T>, [key, ...keys]: string[]) => {
  if (!key) {
    return tree;
  }

  const found = tree.nodes[key];

  if (!found) {
    throw new Error("not found");
  }

  return findNode(found, keys);
};

const omit = (obj, _key: string) =>
  Object.entries(obj).reduce(
    (acc, [key, value]) => (key == _key ? acc : { ...acc, [key]: value }),
    {}
  );

const removeNode = <T>(tree: TTree<T>, key: string) => {
  return makeTree(tree.value, omit(tree.nodes, key));
};

export { makeNode, makeTree, addNode, findNode, removeNode, TTree, TNode };
