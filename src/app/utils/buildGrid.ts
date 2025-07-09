import clsx from "clsx";

export const buildGrid = (colSpan: number) => {
  return clsx(
    "grid gap-4",
    colSpan == 1 && `grid-cols-1`,
    colSpan == 2 && `grid-cols-2`,
    colSpan == 3 && `grid-cols-3`,
    colSpan == 4 && `grid-cols-4`,
    colSpan == 5 && `grid-cols-5`,
  );
};

export const buildColSpan = (colSpan: "1" | "2" | "3" | "4" | "5" | "default") => {
    const validColSpans = {
        "1": "col-span-1",
        "2": "col-span-2",
        "3": "col-span-3",
        "4": "col-span-4",
        "5": "col-span-5",
        "default": "col-span-full"
    };

    return clsx(
      validColSpans[colSpan] || validColSpans["default"]
    );
};

export const buildRowSpan = (rowSpan: "1" | "2" | "3" | "4" | "5" | "default") => {
    const validRowSpans = {
        "1": "row-span-1",
        "2": "row-span-2",
        "3": "row-span-3",
        "4": "row-span-4",
        "5": "row-span-5",
        "default": "row-span-1"
    };

    return clsx(
      validRowSpans[rowSpan] || validRowSpans["default"]
    );
};
