declare module "gremlin" {
  const gremlin: {
    driver: {
      DriverRemoteConnection: new (
        url: string,
        options?: Record<string, unknown>
      ) => {
        close: () => Promise<void>;
      };
    };
    process: {
      AnonymousTraversalSource: {
        traversal: () => {
          withRemote: (connection: unknown) => GraphTraversalSource;
        };
      };
      t: {
        id: unknown;
        label: unknown;
      };
      statics: {
        valueMap: () => unknown;
        outV: () => GraphTraversal & { id: () => unknown };
        inV: () => GraphTraversal & { id: () => unknown };
        out: (...labels: string[]) => GraphTraversal;
        in_: (...labels: string[]) => GraphTraversal;
        both: (...labels: string[]) => GraphTraversal;
        outE: (...labels: string[]) => GraphTraversal;
        inE: (...labels: string[]) => GraphTraversal;
        has: (...args: unknown[]) => GraphTraversal;
        hasLabel: (...labels: string[]) => GraphTraversal;
        values: (...keys: string[]) => GraphTraversal;
        count: () => GraphTraversal;
        unfold: () => GraphTraversal;
        id: () => GraphTraversal;
      };
      order: {
        desc: unknown;
        asc: unknown;
      };
    };
  };

  interface GraphTraversalSource {
    V: (...args: unknown[]) => GraphTraversal;
    E: (...args: unknown[]) => GraphTraversal;
    withSideEffect: (key: string, value: unknown) => GraphTraversalSource;
  }

  interface GraphTraversal {
    has: (...args: unknown[]) => GraphTraversal;
    hasLabel: (...labels: string[]) => GraphTraversal;
    hasId: (...ids: unknown[]) => GraphTraversal;
    out: (...labels: string[]) => GraphTraversal;
    in_: (...labels: string[]) => GraphTraversal;
    both: (...labels: string[]) => GraphTraversal;
    outE: (...labels: string[]) => GraphTraversal;
    inE: (...labels: string[]) => GraphTraversal;
    inV: () => GraphTraversal;
    outV: () => GraphTraversal;
    values: (...keys: string[]) => GraphTraversal;
    dedup: () => GraphTraversal;
    where: (arg: unknown) => GraphTraversal;
    order: () => GraphTraversal;
    limit: (n: number) => GraphTraversal;
    as: (...labels: string[]) => GraphTraversal;
    select: (...labels: string[]) => GraphTraversal;
    unfold: () => GraphTraversal;
    fold: () => GraphTraversal;
    aggregate: (label: string) => GraphTraversal;
    path: () => GraphTraversal;
    repeat: (traversal: GraphTraversal) => GraphTraversal;
    until: (traversal: GraphTraversal) => GraphTraversal;
    simplePath: () => GraphTraversal;
    elementMap: (...keys: string[]) => GraphTraversal;
    id: () => GraphTraversal;
    project: (...keys: string[]) => GraphTraversal;
    by: (arg: unknown, ...rest: unknown[]) => GraphTraversal;
    toList: () => Promise<unknown[]>;
    next: () => Promise<{ value: unknown }>;
    drop: () => GraphTraversal;
    iterate: () => Promise<void>;
    count: () => GraphTraversal;
  }

  export default gremlin;
}
