type MetaEntry = {
  charSet?: string;
  content?: string;
  name?: string;
  property?: string;
  title?: string;
};

type ScriptEntry = {
  children: string;
  type: string;
};

export type HeadConfig = {
  meta?: MetaEntry[];
  scripts?: ScriptEntry[];
};

export function applyHead(config: HeadConfig) {
  document.querySelectorAll("[data-route-head]").forEach((node) => node.remove());

  const title = config.meta?.find((entry) => entry.title)?.title;
  document.title = title ?? "Derivative Bharat";

  config.meta
    ?.filter((entry) => !entry.title && !entry.charSet)
    .forEach((entry) => {
      const meta = document.createElement("meta");
      meta.dataset.routeHead = "true";

      Object.entries(entry).forEach(([key, value]) => {
        if (value) {
          meta.setAttribute(key, value);
        }
      });

      document.head.append(meta);
    });

  config.scripts?.forEach((entry) => {
    const script = document.createElement("script");
    script.dataset.routeHead = "true";
    script.type = entry.type;
    script.textContent = entry.children;
    document.head.append(script);
  });
}
