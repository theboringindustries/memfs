type TNode<T> = {
  value?: any;
  nodes: TNode<T>[];
};
type TTree<T> = TNode<T>;

const makeNode = <T>(value?: T, nodes: TNode<T>[] = []): TNode<T> => {
  return { value, nodes };
};

const makeTree = makeNode;

const addNode = <T>(tree: TTree<T>, node: TNode<T>): TTree<T> => ({
  ...tree,
  nodes: [...tree.nodes, node],
});

const findNode = <T>(
  tree: TTree<T>,
  [predicate, ...predicates]: ((node: TNode<T>) => boolean)[]
) => {
  if (!predicate) {
    return tree;
  }

  const found = tree.nodes.find(predicate);

  if (!found) {
    throw new Error("not found");
  }

  return findNode(found, predicates);
};

const removeNode = <T>(
  tree: TTree<T>,
  predicate: (node: TNode<T>) => boolean
) => {
  return makeTree(tree.value, tree.nodes.filter(predicate));
};

export { makeNode, makeTree, addNode, findNode, removeNode, TTree, TNode };
