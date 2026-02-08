function getGoodsPrice(id) {
  {
    const _ifReturnValue = getPrice(id);
    if (_ifReturnValue) return _ifReturnValue;
  }
  {
    const _ifReturnValue2 = getLastPrice(id);
    if (_ifReturnValue2) return _ifReturnValue2;
  }
  return 0;
}
function getTitle(id) {
  const fromCache = titleCache.get(id);
  {
    const _ifReturnValue3 = fromCache;
    if (_ifReturnValue3) return _ifReturnValue3;
  }
  return "Untitled";
}
