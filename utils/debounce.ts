export default function debounce(callback: Function, delay: number) {
  let timerId: number;

  return (e: NodeJS.Timeout) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(callback, delay, e);
  };
}
