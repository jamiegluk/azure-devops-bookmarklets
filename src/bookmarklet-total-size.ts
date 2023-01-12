const url = "https://dev.azure.com/";

if (!location.href.startsWith(url)) {
  alert(
    '1. Open Azure DevOps to a page with a backlog table.\n2. Ensure the "Size" column is visible.\n3. Run this bookmarklet again.'
  );
  throw new Error("Wrong page");
}

const grid = document.querySelector(".grid:has(.grid-row-selected, .grid-row-selected-blur)");

if (!grid) {
  alert("No rows selected!");
} else {
  const sizeIndex = Array.from(grid.querySelectorAll(".grid-header-column .title")).findIndex(
    (e) => e instanceof HTMLElement && e.innerText === "Size"
  );

  if (sizeIndex === -1) {
    alert("Size column not found!");
  } else {
    const sizes = Array.from(
      grid.querySelectorAll(
        `*:is(.grid-row-selected, .grid-row-selected-blur) .grid-cell:nth-child(${sizeIndex + 2})`
      )
    ).map((e) => (e instanceof HTMLElement ? parseInt(e.innerText, 10) : NaN));
    const valids = sizes.filter((s) => !Number.isNaN(s));
    const totalSize = valids.reduce((a, b) => a + b, 0);
    alert(
      `Total "Size" of selected rows:\n\n${totalSize}\n\n(${sizes.length} items selected, ${valids.length} with sizes set)`
    );
  }
}
