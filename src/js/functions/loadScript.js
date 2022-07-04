function loadScript(src = null) {
  if (!src) throw new Error("Src is empty");

  if (typeof src !== "string") throw new Error("Wrong type");

  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;
    script.setAttribute("async", "async");

    script.onload = () => resolve(script);
    script.onerror = () => {
      script.remove();

      reject(new Error(`Ошибка загрузки скрипта ${src}`));
    };

    document.head.append(script);
  });
}

export { loadScript };
