// 控制最大并发量
type Task<T = any> = () => Promise<T>;

type Dispatch = (...tasks: Task[]) => void;

/**
 * @author glows777
 * @desc 创建最大并发数
 * @param { number } max 控制最带并发数
 * @returns { Function } 接收一些列函数，并且控制最大并发数
 */
function createTaskDispatch(max: number = 5): Dispatch {
  const unExecuteTasks: Task[] = [];

  const controlMaxTask = () => {
    while (max > 0 && unExecuteTasks.length > 0) {
      const task = unExecuteTasks.shift()!;
      max--;
      task().finally(() => {
        max++;
        controlMaxTask();
      });
    }
  };
  return function dispatch(...tasks: Task[]): void {
    unExecuteTasks.push(...tasks);
    controlMaxTask();
  };
}

const sayHello = (num: number): Task => {
  return () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        console.log("hello", num);
        resolve("");
      }, 800);
    });
  };
};

const dispatch = createTaskDispatch(3);
dispatch(sayHello(1), sayHello(2), sayHello(3), sayHello(4), sayHello(5));
