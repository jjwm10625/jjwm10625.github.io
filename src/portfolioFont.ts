export async function loadPortfolioFont() {
  const face = new FontFace(
    "PortfolioHelveticaCondensed",
    'url("/fonts/Helvetica%20Condensed%20Black.ttf") format("truetype")',
    { weight: "900" },
  );
  await face.load();
  document.fonts.add(face);
  document.documentElement.style.setProperty("--name-font", "PortfolioHelveticaCondensed");
  document.documentElement.dataset.nameFont = "Helvetica Condensed Black";
  return true;
}
