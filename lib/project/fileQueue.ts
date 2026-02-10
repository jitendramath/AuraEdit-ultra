/**

 * FILE QUEUE

 * Controls which file is generated next

 * Order is IMPORTANT for production correctness

 */

export type FileTask = {

  path: string;

  purpose: string;

};

export class FileQueue {

  private queue: FileTask[];

  constructor(initialFiles: FileTask[]) {

    this.queue = [...initialFiles];

  }

  isEmpty(): boolean {

    return this.queue.length === 0;

  }

  size(): number {

    return this.queue.length;

  }

  peek(): FileTask | null {

    return this.queue.length > 0 ? this.queue[0] : null;

  }

  next(): FileTask | null {

    return this.queue.shift() || null;

  }

  add(task: FileTask) {

    this.queue.push(task);

  }

  addMany(tasks: FileTask[]) {

    this.queue.push(...tasks);

  }

  snapshot(): FileTask[] {

    return [...this.queue];

  }

}

/**

 * Recommended generation order

 * (Configs → Core → UI → Utils → Extras)

 */

export function buildInitialQueue(files: FileTask[]): FileQueue {

  return new FileQueue(files);

}